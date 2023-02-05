import { Async, path } from "./deps.ts";
import { S_EXEC } from "./inode.ts";
const { pooledMap, abortableAsyncIterable } = Async;

const stackTrace = () => new Error().stack!.split(/^\s*at\s/m)[2].trim();
export const getEnv = (key: string) => {
  const val = Deno.env.get(key);
  if (val === undefined) {
    throw new Error(`PATH is not defined ${stackTrace()}}`);
  }
  return val;
};

/**
 * Gets path to executable.
 * With opts.all set to true, returns all matches(slower).
 */
export function whichSync(cmd: string): string;
export function whichSync(cmd: string, opts: { all: boolean }): string[];
export function whichSync(
  cmd: string,
  opts: { all: boolean } = { all: false },
) {
  const entries: string[] = [];
  const paths = getEnv("PATH")
    .split(path.delimiter);
  for (const dir of paths) {
    const entry = path.join(dir, cmd);
    try {
      const stat = Deno.statSync(entry);
      const { mode } = stat;
      if (mode !== null && (mode & S_EXEC) === S_EXEC) {
        if (!opts.all) {
          // return first match
          return entry;
        } else {
          entries.push(entry);
        }
      }
    } catch (_e) {
      // of no use to us
    }
  }
  if (entries.length === 0) throw new Error(`Command not found: ${cmd}`);

  if (opts.all) return entries as string[];
  else return entries[0];
}

const isExec = (entry: Deno.FileInfo): boolean => {
  try {
    const { mode } = entry;
    return mode !== null && (mode & S_EXEC) === S_EXEC;
  } catch (_e) {
    return false;
  }
};
const isExecSync = (entry: Deno.FileInfo): boolean => {
  try {
    const { mode } = entry;
    return mode !== null && (mode & S_EXEC) === S_EXEC;
  } catch (_e) {
    return false;
  }
};
export async function which(
  cmd: string,
  opts?: { all: boolean },
): Promise<string[]>;
export async function which(cmd: string, opts?: { all: boolean }) {
  const paths = getEnv("PATH").split(path.delimiter);
  const result: string[] = [];
  const pool = paths.map(
    (
      dir: string,
    ): [entry: string, info: Promise<boolean>] => {
      const entry = path.join(dir, cmd);
      return [entry, Deno.stat(entry).then(isExec).catch(() => false)];
    },
  );
  for await (const pooled of pool) {
    const [entry, info] = pooled;
    if (await info) {
      if (!opts?.all) return entry;
      else result.push(entry);
    }
  }
  return result;
}

