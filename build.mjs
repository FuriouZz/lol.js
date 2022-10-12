import { spawnSync } from "child_process";
import { writeFileSync } from "fs";

async function main() {
  /**
   * @type {import("child_process").SpawnOptions}
   */
  const options = { shell: true, stdio: "inherit" };
  spawnSync("rm -rf dist", options);
  spawnSync("tsc -p tsconfig.json", options);
  spawnSync("tsc -p tsconfig.cjs.json", options);
  writeFileSync("./dist/esm/package.json", JSON.stringify({ type: "module" }, null, 2));
  writeFileSync("./dist/cjs/package.json", JSON.stringify({ type: "commonjs" }, null, 2));
}

main();
