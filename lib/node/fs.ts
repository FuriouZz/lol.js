import * as Fs from "fs";
import { FileList } from "filelist";
import { normalize, dirname, isAbsolute, join } from "path";
import { promise } from "./promise";
import { spawnSync } from "child_process";

FileList.debug = false

export function isFile(path:string) {

  try {
    const stat = Fs.statSync( path )
    if (!stat.isFile()) throw 'Not a file'
  } catch(e) {
    return false
  }

  return true

}

export function isDirectory(path:string) {

  try {
    const stat = Fs.statSync( path )
    if (!stat.isDirectory()) throw 'Not a file'
  } catch(e) {
    return false
  }

  return true

}

export function exists(path:string) {
  try {
    Fs.statSync( path )
  } catch(e) {
    return false
  }

  return true
}

export function copy(fromFile:string, toFile:string) {
  return new Promise<boolean>(function(resolve:Function, reject:Function) {

    let fileValid = fromFile !== toFile
    if (!fileValid) throw `Cannot copy '${fromFile}' to the same path`

    fileValid = isFile(fromFile)
    if (!fileValid) throw `'${fromFile}' is not a file`

    ensureDir(dirname( toFile )).then(function() {
      const rs = Fs.createReadStream( fromFile )
      const ws = Fs.createWriteStream( toFile  )

      ws.on('error', function(error:Error) {
        reject(error)
      })
      rs.on('error', function(error:Error) {
        reject(error)
      })
      rs.on('end', function() {
        resolve(true)
      })

      rs.pipe( ws, { end: true })
    })

  })
}

export function remove(path:string) {
  if (isDirectory(path)) return removeDir(path)

  return new Promise<boolean>((resolve: Function, reject: Function) => {

    if (!isFile(path)) throw 'Cannot be removed. This is not a file.'

    Fs.unlink(path, function(err) {
      if (err) {
        reject(err)
        return
      }

      resolve(true)
    })

  })
}

export async function removeDir(dir: string) {
  const files = fetch(join(dir, '**/*'))

  for (let i = 0; i < files.length; i++) {
    await remove(files[i])
  }

  const dirs = fetchDirs(join(dir, '**/*')).reverse()

  for (let j = 0; j < dirs.length; j++) {
    Fs.rmdirSync(dirs[j])
  }

  Fs.rmdirSync(dir)

  return true
}

export function mkdir(dir: string) {
  return new Promise<boolean>(function(resolve:Function, reject:Function) {
    Fs.mkdir(dir, function(err) {
      if (err && err.code !== 'EEXIST') {
        reject(err)
        return
      }

      resolve(true)
    })
  })
}

export async function move(fromFile:string, toFile:string) {
  await copy(fromFile, toFile)
  return remove(fromFile)
}

export function rename(fromFile:string, toFile:string) {
  return move(fromFile, toFile)
}

export async function ensureDir(path:string) {
  path = normalize(path)

  if (isDirectory(path)) return new Promise<boolean>((resolve) => resolve(true))

  const dirs = path.split(/\\|\//)
  const initial = isAbsolute(path) ? dirs.shift() as string : '.'
  const slash = process.platform == 'win32' ? '\\' : '/'

  let res = initial
  let d = ''

  for (let i = 0; i < dirs.length; i++) {
    d = dirs[i];

    if (d === '.') continue

    res += slash + d

    if (!isDirectory(res)) await mkdir(res)
  }
}

export function fetch(include:string|string[], exclude?:string|string[]) {
  const FL = new FileList

  const includes = Array.isArray(include) ? include : [ include ]
  const excludes = Array.isArray(exclude) ? exclude : exclude ? [ exclude ] : []

  includes.forEach((inc) => FL.include( inc ))
  excludes.forEach((exc) => FL.exclude( exc ))

  let files: string[] = []

  try {
    files = FL.toArray()
  } catch (e) {}

  files = files.filter(function(file:string) {
    return isFile( file )
  })

  return files
}

export function fetchDirs(include:string|string[], exclude?:string|string[]) {
  const FL = new FileList

  const includes = Array.isArray(include) ? include : [ include ]
  const excludes = Array.isArray(exclude) ? exclude : exclude ? [ exclude ] : []

  includes.forEach((inc) => FL.include( inc ))
  excludes.forEach((exc) => FL.exclude( exc ))

  const files = FL.toArray().filter(function(file:string) {
    return isDirectory( file )
  })

  return files
}

export async function writeFile(content:string | Buffer, file:string) {
  await ensureDir(dirname(file))

  return new Promise<boolean>((resolve, reject) => {
    Fs.writeFile(file, content, function(err:Error) {
      if (err) {
        reject(err)
        return
      }

      resolve(true)
    })
  })

}

export function readFile(file:string, options?: { encoding?: string | null; flag?: string; } | string | undefined | null) {
  if (!isFile(file)) throw 'This is not a file.'

  return new Promise<string|Buffer>((resolve:Function, reject:Function) => {
    Fs.readFile(file, options, function(err:Error, data:string | Buffer) {
      if (err) {
        reject(err)
        return
      }

      resolve(data)
    })
  })
} 

export type EditFileCallback = (value: string | Buffer) => string | Buffer | Promise<string | Buffer>

export async function editFile(file:string, callback: EditFileCallback) {
  const content = await readFile(file)
  const modified = await callback(content)
  return writeFile(modified, file)
}

export function appendFile(content:string | Buffer, file: string) {
  return new Promise((resolve, reject) => {
    Fs.appendFile(file, content, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}

export function isSymbolicLink(path:string) {
  try {
    const stats = Fs.statSync( path )
    if (!stats.isSymbolicLink()) throw 'Not a symbolic link'
  } catch(e) {
    return false
  }

  return true
}

export async function symlink(fromPath:string, toPath:string) {
  if (!isAbsolute(fromPath)) fromPath = join(process.cwd(), fromPath)
  if (!isAbsolute(toPath)) toPath = join(process.cwd(), toPath)

  if (isSymbolicLink(toPath) || exists(toPath)) {
    throw `Cannot create a symbolic link at ${toPath}`;
  }

  await ensureDir(dirname(toPath))

  return promise<boolean>((resolve, reject) => {
    Fs.symlink(fromPath, toPath, function(err) {
      if (err) {
        reject( err )
        return
      }

      resolve(true)
    })
  })
}

type ShellType = 'cmd' | 'bash' | 'powershell' | 'zsh'

export async function symlink2(fromPath: string, toPath: string, shell: ShellType = process.platform == 'win32' ? 'cmd' : 'bash') {
  if (exists(toPath)) throw `Cannot create a symbolic link at ${toPath}`;

  let command = ''

  if (!isAbsolute(fromPath)) fromPath = join(process.cwd(), fromPath)
  if (!isAbsolute(toPath)) toPath = join(process.cwd(), toPath)

  await ensureDir(dirname(toPath))

  if (process.platform == 'win32') {
    command = `mklink /D "${toPath}" "${fromPath}"`
  } else {
    command = `ln -s ${fromPath} ${toPath}`
  }

  return promise<boolean>((resolve, reject) => {
    const cmd = command.split(' ')
    const cli = cmd.shift() as string
    const ps  = spawnSync(cli, cmd, { shell: shell })

    if (ps.error) {
      reject(ps.error)
    } else {
      resolve(true)
    }
  })
}

export function touch(path: string) {
  const id = Fs.openSync(path, 'w')
  Fs.closeSync(id)
  return true
}