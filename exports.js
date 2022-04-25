import { fetch, writeFileSync } from "./esm/node/fs.js";
import { sep, posix } from "path";
import { readFileSync } from "fs";

const files = fetch("esm/**/*.js");
const records = {};
const pkg = JSON.parse(readFileSync("package.json", "utf-8"));

const jsPrefixReg = /\.\/esm/;
const jsExtReg = /\.js$/;
const indexSuffixReg = /\/index$/;

for (let file of files) {
  let js = "./" + file;

  if (sep !== posix.sep) {
    js = js.split(sep).join(posix.sep);
  }

  let esm = js.replace(jsPrefixReg, "./esm");
  let entry = js.replace(jsPrefixReg, ".");

  records[entry] = {
    require: js,
    import: esm,
  };

  entry = entry.replace(jsExtReg, "");

  records[entry] = {
    require: js,
    import: esm,
  };

  if (indexSuffixReg.test(entry)) {
    entry = entry.replace(indexSuffixReg, "");
    records[entry] = {
      require: js,
      import: esm,
    };
  }
}

pkg.exports = records;
writeFileSync("package.json", JSON.stringify(pkg, null, 2));
