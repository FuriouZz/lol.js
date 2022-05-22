import { spawnSync } from "child_process";

async function main() {
  /**
   * @type {import("child_process").SpawnOptions}
   */
  const options = { shell: true, stdio: "inherit" };
  spawnSync("npm run build", options);
  spawnSync("cp package.json dist/package.json", options);
  spawnSync("cp README.md dist/README.md", options);
  spawnSync("npm publish --access public", { ...options, cwd: "dist" });
}

main();
