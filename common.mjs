import { createRequire } from "module";
import { join, relative } from "path";
const require = createRequire(import.meta.url);

export function getConfigs() {
  const pkg = require("./package.json");
  const esmTSConfig = require("./tsconfig.esm.json");
  const cjsTSConfig = require("./tsconfig.cjs.json");

  const publishDirectory = pkg.publishConfig.directory;
  const esmDir = relative(publishDirectory, esmTSConfig.compilerOptions.outDir);
  const esmTypesDir = relative(
    publishDirectory,
    esmTSConfig.compilerOptions.declarationDir
  );
  const cjsDir = relative(publishDirectory, cjsTSConfig.compilerOptions.outDir);
  const cjsTypesDir = relative(
    publishDirectory,
    cjsTSConfig.compilerOptions.declarationDir ||
      esmTSConfig.compilerOptions.declarationDir
  );

  return { publishDirectory, esmDir, esmTypesDir, cjsDir, cjsTypesDir, pkg };
}

/**
 *
 * @param  {...string[]} path
 */
export function pathJoin(...path) {
  const p = join(...path);
  if (p.startsWith("/")) return "." + p;
  return "./" + p;
}
