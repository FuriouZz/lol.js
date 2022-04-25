const { spawnSync } = require("child_process");

async function main() {
  /**
   * @type {import("child_process").SpawnOptions}
   */
  const options = { shell: true, stdio: "inherit" };
  spawnSync("node build.js", options);
  spawnSync("cp package.json dist/package.json", options);
  const { editFileSync } = require("./dist/node/fs");
  editFileSync("dist/package.json", (v) => {
    const pkg = JSON.parse(v.toString("utf-8"));
    delete pkg.scripts.publish;
    return JSON.stringify(pkg, null, 2);
  });
  spawnSync("npm publish --access public", { ...options, cwd: "dist" });
}

main();
