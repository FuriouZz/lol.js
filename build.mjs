import { spawnSync } from "child_process";
import { writeFileSync } from "fs";
import { join } from "path";
import { getConfigs } from "./common.mjs";

async function main() {
  const { cjsDir, publishDirectory } = getConfigs()

  /**
   * @type {import("child_process").SpawnOptions}
   */
  const options = { shell: true, stdio: "inherit" };
  spawnSync("rm -rf dist", options);
  spawnSync("tsc -p tsconfig.esm.json", options);
  spawnSync("tsc -p tsconfig.cjs.json", options);
  // writeFileSync(join(esmDir, "package.json"), JSON.stringify({ type: "module" }, null, 2));
  writeFileSync(join(publishDirectory, cjsDir, "package.json"), JSON.stringify({ type: "commonjs" }, null, 2));
  await import("./exports.mjs")
}

main();
