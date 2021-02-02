const { build } = require("esbuild")
const { fetch } = require("./js/node/fs")

const files = fetch("**/*.ts")

for (const file of files) {
  if (file.match("node")) continue
  build({
    entryPoints: [file],
    format: "esm",
    outdir: "dist/esm"
  })
}