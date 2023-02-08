import { S_EXEC } from "./inode.ts";
interface FileInfo extends Deno.FileInfo {
  isExecutable: boolean;
  filepath: string;
}
export async function fileInfo(filepath: string): Promise<FileInfo>;
export async function fileInfo(
  filepath: string,
  opts?: { nothrow: boolean },
): Promise<FileInfo | null>;
export async function fileInfo(
  filepath: string,
  opts?: { nothrow: boolean },
): Promise<FileInfo | null> {
  opts = opts ?? { nothrow: false };
  if (opts.nothrow) {
    try {
      const fstat = await Deno.stat(filepath);
      return {
        filepath,
        ...fstat,
        isExecutable: fstat.mode !== null ? (fstat.mode & S_EXEC) !== 0 : false,
      };
    } catch (_e) {
      return null;
    }
  }
  const fstat = await Deno.stat(filepath);
  return {
    filepath,
    ...fstat,
    isExecutable: fstat.mode !== null ? (fstat.mode & S_EXEC) !== 0 : false,
  };
}

export function fileInfoSync(filepath: string): FileInfo;
export function fileInfoSync(
  filepath: string,
  opts?: { nothrow: boolean },
): FileInfo | null;
export function fileInfoSync(
  filepath: string,
  opts?: { nothrow: boolean },
): FileInfo | null {
  opts = opts ?? { nothrow: false };
  if (opts.nothrow) {
    try {
      const fstat = Deno.statSync(filepath);
      return {
        filepath,
        ...fstat,
        isExecutable: fstat.mode !== null ? (fstat.mode & S_EXEC) !== 0 : false,
      };
    } catch (_e) {
      return null;
    }
  }
  const fstat = Deno.statSync(filepath);
  return {
    filepath,
    ...fstat,
    isExecutable: fstat.mode !== null ? (fstat.mode & S_EXEC) !== 0 : false,
  };
}
