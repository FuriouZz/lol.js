import { spawnSync } from "child_process";
import { readFileSync, writeFileSync } from "fs";

async function main() {
  /**
   * @type {import("child_process").SpawnOptions}
   */
  const options = { shell: true, stdio: "inherit" };
  spawnSync("npm run build", options);
  spawnSync("cp package.json dist/package.json", options);
  spawnSync("cp README.md dist/README.md", options);

  const pkg = JSON.parse(readFileSync("dist/package.json", "utf-8"));
  delete pkg.scripts.publish;
  writeFileSync("dist/package.json", JSON.stringify(pkg, null, 2));

  spawnSync("npm publish --access public", { ...options, cwd: "dist" });
}

main();
