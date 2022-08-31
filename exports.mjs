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
    import: `./index.js`,
    types: `./index.d.ts`,
  },
  "./*": {
    import: `./*`,
    types: `./*`
  },
};

for (const dir of dirs) {
  if (!isFile(join("./lib", dir, "index.ts"))) continue;
  exports[`./${dir}`] = {
    import: `./${dir}/index.js`,
    types: `./${dir}/index.d.ts`,
  };
  const files = readdirSync(join("./lib", dir));
  for (const file of files) {
    if (!isFile(join("./lib", dir, file))) continue;
    const name = basename(file, extname(file));
    exports[`./${dir}/${name}`] = {
      import: `./${dir}/${name}.js`,
      types: `./${dir}/${name}.d.ts`,
    };
    exports[`./${dir}/${name}.js`] = {
      import: `./${dir}/${name}.js`,
      types: `./${dir}/${name}.d.ts`,
    };
  }
}

const pkg = JSON.parse(readFileSync("package.json", "utf-8"));
pkg.main = "./index.js";
pkg.types = "./index.d.ts";
pkg.exports = exports;
writeFileSync("package.json", JSON.stringify(pkg, null, 2));
