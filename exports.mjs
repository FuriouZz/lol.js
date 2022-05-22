import { sep, posix, join } from "path";
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
  },
  "./*": {
    import: `./*`,
  },
};

for (const dir of dirs) {
  if (!isFile(join("./lib", dir, "index.ts"))) continue;
  exports[`./${dir}`] = {
    import: `./${dir}/index.js`,
  };
}

const pkg = JSON.parse(readFileSync("package.json", "utf-8"));
pkg.main = "./index.js";
pkg.types = "./index.d.ts";
pkg.exports = exports;
writeFileSync("package.json", JSON.stringify(pkg, null, 2));
