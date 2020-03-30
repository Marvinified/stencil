import * as d from '../../../declarations';
import { COMMON_DIR_FILENAMES, getCommonDirName, isCommonDirModuleFile, shouldFetchModule } from './resolve-utils';
import { basename, dirname } from 'path';
import { fetchModuleAsync } from '../fetch/fetch-module-async';
import { getCommonDirUrl, getNodeModuleFetchUrl, packageVersions } from '../fetch/fetch-utils';
import { isString, normalizeFsPath, normalizePath } from '@utils';
import resolve, { AsyncOpts } from 'resolve';

export const resolveModuleIdAsync = (sys: d.CompilerSystem, inMemoryFs: d.InMemoryFileSystem, opts: d.ResolveModuleIdOptions) => {
  const resolverOpts: AsyncOpts = createCustomResolverAsync(sys, inMemoryFs, opts.exts);
  resolverOpts.basedir = dirname(opts.containingFile);
  resolverOpts.packageFilter = opts.packageFilter;

  return new Promise<{ resolveId: string; pkgData: d.PackageJsonData }>((resolvePromise, rejectPromise) => {
    resolve(opts.moduleId, resolverOpts, (err, resolveId, pkgData: any) => {
      if (err) {
        rejectPromise(err);
      } else {
        resolvePromise({
          resolveId: normalizePath(resolveId),
          pkgData,
        });
      }
    });
  });
};

export const createCustomResolverAsync = (sys: d.CompilerSystem, inMemoryFs: d.InMemoryFileSystem, exts: string[]): any => {
  return {
    async isFile(filePath: string, cb: (err: any, isFile: boolean) => void) {
      const fsFilePath = normalizeFsPath(filePath);

      const stat = await inMemoryFs.stat(fsFilePath);
      if (stat.isFile) {
        cb(null, true);
        return;
      }

      if (shouldFetchModule(fsFilePath)) {
        const endsWithExt = exts.some(ext => fsFilePath.endsWith(ext));
        if (endsWithExt) {
          const url = getNodeModuleFetchUrl(sys, packageVersions, fsFilePath);
          const content = await fetchModuleAsync(sys, inMemoryFs, packageVersions, url, fsFilePath);
          const checkFileExists = typeof content === 'string';
          cb(null, checkFileExists);
          return;
        }
      }

      cb(null, false);
    },

    async isDirectory(dirPath: string, cb: (err: any, isDirectory: boolean) => void) {
      const fsDirPath = normalizeFsPath(dirPath);

      const stat = await inMemoryFs.stat(fsDirPath);
      if (stat.isDirectory) {
        cb(null, true);
        return;
      }

      if (shouldFetchModule(fsDirPath)) {
        if (basename(fsDirPath) === 'node_modules') {
          // just the /node_modules directory
          inMemoryFs.sys.mkdirSync(fsDirPath);
          inMemoryFs.clearFileCache(fsDirPath);
          cb(null, true);
          return;
        }

        if (isCommonDirModuleFile(fsDirPath)) {
          // don't bother seeing if it's a directory if it has a common file extension
          cb(null, false);
          return;
        }

        for (const fileName of COMMON_DIR_FILENAMES) {
          const url = getCommonDirUrl(sys, packageVersions, fsDirPath, fileName);
          const filePath = getCommonDirName(fsDirPath, fileName);
          const content = await fetchModuleAsync(sys, inMemoryFs, packageVersions, url, filePath);
          if (isString(content)) {
            cb(null, true);
            return;
          }
        }
      }

      cb(null, false);
    },

    async readFile(p: string, cb: (err: any, data: any) => void) {
      const fsFilePath = normalizeFsPath(p);

      const data = await inMemoryFs.readFile(fsFilePath);
      if (isString(data)) {
        return cb(null, data);
      }

      return cb(`readFile not found: ${p}`, undefined);
    },

    extensions: exts,
  };
};
