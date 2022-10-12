import { basename, extname, join } from "path";
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
    source: `./lib/index.ts`,
    import: `./dist/esm/index.js`,
    require: `./dist/cjs/index.js`,
    types: `./dist/types/index.d.ts`,
  },
  "./*": {
    source: `./lib/*`,
    import: `./dist/esm/*`,
    require: `./dist/cjs/*`,
    types: `./dist/types/*`
  },
};

for (let dir of dirs) {
  if (!isFile(join("./lib", dir, "index.ts"))) continue;
  exports[`./${dir}`] = {
    source: `./lib/${dir}/index.ts`,
    import: `./dist/esm/${dir}/index.js`,
    require: `./dist/cjs/${dir}/index.js`,
    types: `./dist/types/${dir}/index.d.ts`,
  };
  const files = readdirSync(join("./lib", dir));
  for (const file of files) {
    if (!isFile(join("./lib", dir, file))) continue;
    const name = basename(file, extname(file));
    exports[`./${dir}/${name}`] = {
      source: `./lib/${dir}/${name}.ts`,
      import: `./dist/esm/${dir}/${name}.js`,
      require: `./dist/cjs/${dir}/${name}.js`,
      types: `./dist/types/${dir}/${name}.d.ts`,
    };
    exports[`./${dir}/${name}.js`] = {
      source: `./lib/${dir}/${name}.ts`,
      import: `./dist/esm/${dir}/${name}.js`,
      require: `./dist/cjs/${dir}/${name}.js`,
      types: `./dist/types/${dir}/${name}.d.ts`,
    };
  }
}

const pkg = JSON.parse(readFileSync("package.json", "utf-8"));
pkg.main = `./dist/cjs/index.js`;
pkg.module = "./dist/esm/index.js";
pkg.types = "./dist/types/index.d.ts";
pkg.exports = exports;
writeFileSync("package.json", JSON.stringify(pkg, null, 2));
