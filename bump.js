const { editFile, readFile, writeFile } = require("./js/node/fs");
const inc = require("semver/functions/inc")
const { spawnSync } = require("child_process")

const Options = { shell: true, stdio: 'inherit' }

async function _bump(release = "patch") {
  let version = null

  await editFile("package.json", (buf) => {
    const pkg = JSON.parse(buf.toString("utf-8"))
    version = inc(pkg.version, release)

    if (version === null) {
      throw new Error(`Bump failed`)
    }

    pkg.version = version
    return JSON.stringify(pkg, null, 2)
  })

  spawnSync("npm install", Options)
  spawnSync(`git commit -am "Bump ${version}" && git tag ${version} && git push --tags && git push`, Options)
}

async function main() {
  const release = process.argv[2] || "patch"

  const buf0 = await readFile("package.json")
  const pkg0 = JSON.parse(buf0.toString("utf-8"))
  const buf1 = await readFile("package-lock.json")
  const pkg1 = JSON.parse(buf1.toString("utf-8"))

  try {
    await _bump(release)
  } catch (e) {
    // Restore version
    await writeFile(JSON.stringify(pkg0, null, 2), "package.json")
    await writeFile(JSON.stringify(pkg1, null, 2), "package-lock.json")
    console.log(e)
    process.exit(1)
  }
}

main()
  .then(null, console.log)
