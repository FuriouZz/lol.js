const { build } = require("esbuild")

build({
  entryPoints: [
    "lib/index.ts",
    "lib/index-dom.ts",
  ],
  bundle: true,
  format: "esm",
  outdir: "dist/esm"
})

build({
  entryPoints: [
    "lib/index.ts",
    "lib/index-dom.ts",
  ],
  bundle: true,
  format: "cjs",
  outdir: "dist/cjs"
})

build({
  entryPoints: [
    "lib/index-node.ts",
  ],
  external: [ "filelist" ],
  bundle: true,
  format: "cjs",
  platform: "node",
  target: ["node14.9"],
  outdir: "dist/cjs"
})