import { join } from "path";
import { readdirSync, statSync, writeFileSync } from "fs";
import { getConfigs, pathJoin } from "./common.mjs";

const isFile = (path) => {
  try {
    const stat = statSync(path);
    return stat.isFile();
  } catch (e) {}
  return false;
};

const dirs = readdirSync("./lib", { withFileTypes: false });

const { esmDir, esmTypesDir, cjsDir, cjsTypesDir, pkg } = getConfigs();

const exports = {
  ".": {
    import: {
      types: pathJoin(`${esmTypesDir}/index.d.ts`),
      default: pathJoin(`${esmDir}/index.js`),
    },
    require: {
      types: pathJoin(`${cjsTypesDir}/index.d.ts`),
      default: pathJoin(`${cjsDir}/index.js`),
    },
  },
  "./*": {
    import: {
      types: pathJoin(`${esmTypesDir}/*.d.ts`),
      default: pathJoin(`${esmDir}/*.js`),
    },
    require: {
      types: pathJoin(`${cjsTypesDir}/*.d.ts`),
      default: pathJoin(`${cjsDir}/*.js`),
    },
  },
  "./*.js": {
    import: {
      types: pathJoin(`${esmTypesDir}/*.d.ts`),
      default: pathJoin(`${esmDir}/*.js`),
    },
    require: {
      types: pathJoin(`${cjsTypesDir}/*.d.ts`),
      default: pathJoin(`${cjsDir}/*.js`),
    },
  },
};

for (let dir of dirs) {
  if (!isFile(join("./lib", dir, "index.ts"))) continue;
  exports[`./${dir}`] = {
    import: {
      types: pathJoin(`${esmTypesDir}/${dir}/index.d.ts`),
      default: pathJoin(`${esmDir}/${dir}/index.js`),
    },
    require: {
      types: pathJoin(`${cjsTypesDir}/${dir}/index.d.ts`),
      default: pathJoin(`${cjsDir}/${dir}/index.js`),
    },
  };

  exports[`./${dir}/*`] = {
    import: {
      types: pathJoin(`${esmTypesDir}/${dir}/*.d.ts`),
      default: pathJoin(`${esmDir}/${dir}/*.js`),
    },
    require: {
      types: pathJoin(`${cjsTypesDir}/${dir}/*.d.ts`),
      default: pathJoin(`${cjsDir}/${dir}/*.js`),
    },
  };

  exports[`./${dir}/*.js`] = {
    import: {
      types: pathJoin(`${esmTypesDir}/${dir}/*.d.ts`),
      default: pathJoin(`${esmDir}/${dir}/*.js`),
    },
    require: {
      types: pathJoin(`${cjsTypesDir}/${dir}/*.d.ts`),
      default: pathJoin(`${cjsDir}/${dir}/*.js`),
    },
  };
}

pkg.publishConfig.main = pathJoin(`${cjsDir}/index.js`);
pkg.publishConfig.module = pathJoin(`${esmDir}/index.js`);
pkg.publishConfig.types = pathJoin(`${esmTypesDir}/index.d.ts`);
pkg.publishConfig.exports = exports;
writeFileSync("package.json", JSON.stringify(pkg, null, 2));
