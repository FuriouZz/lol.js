const Path = require('path')
const { fetch, writeFile } = require('./js/node/fs')
const { toCamelCase } = require('./js/string')

async function compose(files, input = './', output) {
  const imprts = []
  const exprts = []
  files.forEach((file) => {
    file = Path.normalize(file.replace('lib/', ''))
    const f = Path.parse(file)
    const m = toCamelCase(f.dir + ' ' + f.name)
    const mi = toCamelCase(f.dir)
    const alias = '_' + m

    imprts.push(`import * as ${alias} from "${input}${file.replace(f.ext, '')}"`);

    if (f.name == 'index') {
      exprts.push(`export const ${mi} = ${alias};`)
    } else {
      exprts.push(`export const ${m} = ${alias};`)
    }
  })

  // console.log(imprts);
  // console.log(exprts);

  await writeFile([imprts.join('\n'), exprts.join('\n')].join('\n\n'), output)
}

async function main() {
  const files = fetch('./lib/**/*', ['lib/index.ts', 'lib/node/**/*'])
  await compose(files, './', './lib/index.ts')
}

main()