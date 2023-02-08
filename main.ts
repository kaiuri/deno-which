import { Path } from "./deps.ts";

import { fileInfo, fileInfoSync } from "./file_info.ts";

const stackTrace = () => new Error().stack!.split(/^\s*at\s/m)[2].trim();

const getEnv = (key: string) => {
  const val = Deno.env.get(key);
  if (val === undefined) {
    throw new Error(`PATH is not defined ${stackTrace()}}`);
  }
  return val;
};

/**
 * Synchronously gets an executable's path, or paths if opts.all is true.
 * Asynchronous version is faster.
 */
export function whichSync(cmd: string): string;
export function whichSync(
  cmd: string,
  opts?: { all: boolean },
): string[];
export function whichSync(
  cmd: string,
  opts?: { all: boolean },
) {
  const entries: string[] = [];
  opts = opts ?? { all: false };
  const { all } = opts;
  const paths = getEnv("PATH").split(Path.delimiter);
  for (const p of paths) {
    const entry = Path.join(p, cmd);
    try {
      const info = fileInfoSync(entry);
      if (!all && info.isExecutable) return entry;
      if (all && info.isExecutable) entries.push(entry);
    } catch (_e) {
      continue;
    }
  }
  return entries;
}

/**
 * Asynchronously gets an executable's path, or paths if opts.all is true.
 * Faster than the synchronous version.
 */
export async function which(cmd: string): Promise<string>;
export async function which(
  cmd: string,
  opts?: { all: boolean },
): Promise<string[]>;
export async function which(
  cmd: string,
  opts?: { all: boolean },
) {
  opts = opts ?? { all: false };
  const { all } = opts;
  const paths = getEnv("PATH").split(Path.delimiter);
  const entries: string[] = [];
  for (const p of paths) {
    try {
      const info = await fileInfo(Path.join(p, cmd), { nothrow: true });
      if (info !== null && info.isExecutable) {
        if (!all) return info.filepath;
        entries.push(info.filepath);
      }
    } catch (_e) {
      continue;
    }
  }

  return entries;
}
