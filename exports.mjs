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
    require: `./index.js`,
    default: `./index.js`,
  },
  "./*": {
    require: `./*`,
    default: `./*`
  },
};

for (const dir of dirs) {
  if (!isFile(join("./lib", dir, "index.ts"))) continue;
  exports[`./${dir}`] = {
    require: `./${dir}/index.js`,
    default: `./${dir}/index.js`,
  };
  const files = readdirSync(join("./lib", dir));
  for (const file of files) {
    if (!isFile(join("./lib", dir, file))) continue;
    const name = basename(file, extname(file));
    exports[`./${dir}/${name}`] = {
      require: `./${dir}/${name}.js`,
      default: `./${dir}/${name}.js`,
    };
    exports[`./${dir}/${name}.js`] = {
      require: `./${dir}/${name}.js`,
      default: `./${dir}/${name}.js`,
    };
  }
}

const pkg = JSON.parse(readFileSync("package.json", "utf-8"));
pkg.main = "./index.js";
pkg.types = "./index.d.ts";
pkg.exports = exports;
writeFileSync("package.json", JSON.stringify(pkg, null, 2));
