import { S_EXEC } from "./inode.ts";
type FileInfo = Deno.FileInfo & {
  isExecutable: boolean;
};
export const fileInfo = async (filepath: string): Promise<FileInfo> => {
  const fstat = await Deno.stat(filepath);
  return {
    ...fstat,
    isExecutable: fstat.mode !== null ? (fstat.mode & S_EXEC) !== 0 : false,
  };
};

export const fileInfoSync = (filepath: string): FileInfo => {
  const fstat = Deno.statSync(filepath);
  return {
    ...fstat,
    isExecutable: fstat.mode !== null ? (fstat.mode & S_EXEC) !== 0 : false,
  };
};
