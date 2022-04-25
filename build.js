const { spawnSync } = require("child_process");

async function main() {
  /**
   * @type {import("child_process").SpawnOptions}
   */
  const options = { shell: true, stdio: "inherit" };
  spawnSync("rm -rf dist", options);
  spawnSync("tsc -p tsconfig.json", options);
}

main();