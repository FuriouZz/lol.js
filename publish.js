import { spawnSync } from "child_process";
import { editFileSync } from "@furiouzz/lol/node/fs.js";

async function main() {
  /**
   * @type {import("child_process").SpawnOptions}
   */
  const options = { shell: true, stdio: "inherit" };
  spawnSync("npm run build", options);
  spawnSync("cp package.json dist/package.json", options);
  spawnSync("cp README.md dist/README.md", options);
  editFileSync("dist/package.json", (v) => {
    const pkg = JSON.parse(v.toString("utf-8"));
    delete pkg.scripts.publish;
    return JSON.stringify(pkg, null, 2);
  });
  spawnSync("npm publish --access public", { ...options, cwd: "dist" });
}

main();
