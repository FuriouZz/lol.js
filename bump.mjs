import { copyFileSync, readFileSync, writeFileSync } from "fs";
import semver from "semver";
import { spawnSync } from "child_process";

const Options = { shell: true, stdio: "inherit" };

/**
 *
 * @param {string} version
 */
function bump(version) {
  spawnSync(
    `git commit -am "Bump ${version}" && git tag ${version} && git push --tags && git push`,
    Options
  );
  copyFileSync("./package.json", "./dist/package.json");
}

function getPackage(release = "patch", identifier = undefined) {
  const pkg = JSON.parse(readFileSync("package.json", { encoding: "utf-8" }));
  if (identifier && pkg.version.includes(identifier)) {
    release = "prerelease";
  }
  const nextVersion = semver.inc(pkg.version, release, undefined, identifier);
  return {
    pkg,
    currentVersion: pkg.version,
    nextVersion,
    save() {
      pkg.version = nextVersion;
      writeFileSync("package.json", JSON.stringify(pkg, null, 2));
    },
  };
}

const getRelease = () => {
  const index = process.argv.findIndex((a) =>
    /^(pre)?(patch|minor|major|release)/.test(a)
  );
  if (index === -1) return { release: "patch", identifier: undefined };
  const [release, identifier] = process.argv[index].split("-");
  return { release: identifier ? `pre${release}` : release, identifier };
};

async function main() {
  const run = process.argv.includes("--run");
  const { release, identifier } = getRelease();

  const buf0 = readFileSync("package.json");
  const pkg0 = JSON.parse(buf0.toString("utf-8"));

  try {
    const pkg = getPackage(release, identifier);
    console.log(`Current version: ${pkg.currentVersion}`);
    console.log(`Next version: ${pkg.nextVersion}`);
    if (run) {
      pkg.save();
      bump(pkg.nextVersion);
    } else {
      console.log("\n> Use --run to execute");
    }
  } catch (e) {
    // Restore version
    writeFileSync(JSON.stringify(pkg0, null, 2), "package.json");
    console.log(e);
    process.exit(1);
  }
}

main().then(null, console.log);
