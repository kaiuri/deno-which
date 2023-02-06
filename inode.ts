export enum ModeBitMask {
  S_IFMT = 0o170000, // bit mask for the file type bit field
  S_IFSOCK = 0o140000, // socket
  S_IFLNK = 0o120000, //  symbolic link
  S_IFREG = 0o100000, //  regular file
  S_IFBLK = 0o060000, //  block device
  S_IFDIR = 0o040000, //  directory
  S_IFCHR = 0o020000, //  character device
  S_IFIFO = 0o010000, //  FIFO

  S_ISUID = 0o4000, // set-user-ID bit (see execve(2))
  S_ISGID = 0o2000, // set-group-ID bit (see below)
  S_ISVTX = 0o1000, // sticky bit (see below)

  S_IRWXU = 0o0700, // owner has read, write, and execute permission
  S_IRUSR = 0o0400, // owner has read permission
  S_IWUSR = 0o0200, // owner has write permission
  S_IXUSR = 0o0100, // owner has execute permission

  S_IRWXG = 0o0070, // group has read, write, and execute permission
  S_IRGRP = 0o0040, // group has read permission
  S_IWGRP = 0o0020, // group has write permission
  S_IXGRP = 0o0010, // group has execute permission

  S_IRWXO = 0o0007, // others (not in group) have read,  write,  and
  S_IROTH = 0o0004, // others have read permission
  S_IWOTH = 0o0002, // others have write permission
  S_IXOTH = 0o0001, // others have execute permission
}

// is Executable
export const S_EXEC = ModeBitMask.S_IXUSR | ModeBitMask.S_IXGRP |
  ModeBitMask.S_IXOTH;
