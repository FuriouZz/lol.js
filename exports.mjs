import { join } from "path";
import { readdirSync, readFileSync, statSync, writeFileSync } from "fs";

const isFile = (path) => {
  try {
    const stat = statSync(path);
    return stat.isFile();
  } catch (e) {}
  return false;
};

const dirs = readdirSync("./lib", { withFileTypes: false });

const exports = {
  ".": {
    import: {
      types: `./dist/esm/index.d.ts`,
      default: `./dist/esm/index.js`,
    },
    require: {
      types: `./dist/cjs/index.d.ts`,
      default: `./dist/cjs/index.js`,
    },
  },
  "./*": {
    import: {
      types: `./dist/esm/*.d.ts`,
      default: `./dist/esm/*.js`,
    },
    require: {
      types: `./dist/cjs/*.d.ts`,
      default: `./dist/cjs/*.js`,
    },
  },
  "./*.js": {
    import: {
      types: `./dist/esm/*.d.ts`,
      default: `./dist/esm/*.js`,
    },
    require: {
      types: `./dist/cjs/*.d.ts`,
      default: `./dist/cjs/*.js`,
    },
  },
};

for (let dir of dirs) {
  if (!isFile(join("./lib", dir, "index.ts"))) continue;
  exports[`./${dir}`] = {
    import: {
      types: `./dist/esm/${dir}/index.d.ts`,
      default: `./dist/esm/${dir}/index.js`,
    },
    require: {
      types: `./dist/cjs/${dir}/index.d.ts`,
      default: `./dist/cjs/${dir}/index.js`,
    },
  };

  exports[`./${dir}/*`] = {
    import: {
      types: `./dist/esm/${dir}/*.d.ts`,
      default: `./dist/esm/${dir}/*.js`,
    },
    require: {
      types: `./dist/cjs/${dir}/*.d.ts`,
      default: `./dist/cjs/${dir}/*.js`,
    },
  };

  exports[`./${dir}/*.js`] = {
    import: {
      types: `./dist/esm/${dir}/*.d.ts`,
      default: `./dist/esm/${dir}/*.js`,
    },
    require: {
      types: `./dist/cjs/${dir}/*.d.ts`,
      default: `./dist/cjs/${dir}/*.js`,
    },
  };
}

const pkg = JSON.parse(readFileSync("package.json", "utf-8"));
pkg.main = `./dist/cjs/index.js`;
pkg.module = "./dist/esm/index.js";
pkg.types = "./dist/types/index.d.ts";
pkg.exports = exports;
writeFileSync("package.json", JSON.stringify(pkg, null, 2));
