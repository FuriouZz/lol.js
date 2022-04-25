const { spawnSync } = require("child_process");

async function main() {
  /**
   * @type {import("child_process").SpawnOptions}
   */
  const options = { shell: true, stdio: "inherit" };
  spawnSync("node build.js", options);
  spawnSync("cp package.json dist/package.json", options);
  spawnSync("npm publish ./dist", options);
}

main();
