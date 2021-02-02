import { spawn, SpawnOptions } from 'child_process'
import { defer } from '../promise/defer'
import { Readable, Writable } from 'stream'

export interface ExecOptions extends SpawnOptions {
  throwOnError?: boolean
  color?: boolean
  extendEnv?: boolean
  fetchStdout?: boolean
  fetchStderr?: boolean
}

export interface ExecEntry {
  command: string
  options: ExecOptions
}

export interface ExecResult {
  code: number | null
  signal: NodeJS.Signals | null
  stdout: Buffer
  stderr: Buffer
}

export class Exec {

  protected defer = defer<ExecResult>()
  stdout?: Readable
  stderr?: Readable
  stdin?: Writable
  stdio: [Writable?, Readable?, Readable?] = [ undefined, undefined, undefined ]

  async then<TResult1 = ExecResult, TResult2 = never>(onfulfilled?: ((value: ExecResult) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2> {
    return this.defer.promise.then(onfulfilled)
  }

  async catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<ExecResult | TResult> {
    return this.defer.promise.catch(onrejected)
  }

  promise() {
    return this.defer.promise
  }

  run(command: string, options: ExecOptions = {}) {
    options = Object.assign({
      shell: true,
      stdio: 'pipe',
      color: true,
      extendEnv: true,
    }, options)

    options.env = Object.assign({
      FORCE_COLOR: options.color
    }, options.extendEnv ? process.env : {}, options.env || {})

    const args = command.split(' ')
    const cmd = args.shift()
    if (typeof cmd !== 'string') throw new Error(`No command to execute`)

    const ps = spawn(cmd, args, options)

    let stdout = Buffer.from('')
    let stderr = Buffer.from('')

    if (ps.stdin) {
      this.stdin = ps.stdin
      this.stdio[0] = ps.stdin
    }

    if (ps.stdout) {
      this.stdout = ps.stdout
      this.stdio[1] = ps.stdout
    }

    if (ps.stderr) {
      this.stderr = ps.stderr
      this.stdio[2] = ps.stderr
    }

    if (ps.stdout && options.fetchStdout) {
      ps.stdout.on('data', function (d) {
        const b: Buffer = typeof d === 'string' ? Buffer.from(d) : d
        stdout = Buffer.concat([stdout, b])
        // console.log(d.toString('utf-8'))
      })
    }

    if (ps.stderr && options.fetchStderr) {
      ps.stderr.on('data', function (d) {
        const b: Buffer = typeof d === 'string' ? Buffer.from(d) : d
        stderr = Buffer.concat([stderr, b])
        // console.log(d.toString('utf-8'))
      })
    }

    ps.on('error', (error) => {
      // console.log(error)
      if (options.throwOnError) {
        this.defer.reject(error)
      }
    })

    ps.on('exit', (code, signal) => {
      this.defer.resolve({
        code,
        signal,
        stdout,
        stderr,
      })
    })

    return this
  }

}

export function exec(command: string, options: ExecOptions = {}) {
  const e = new Exec()
  return e.run(command, options)
}

export function execParallel(commands: Array<ExecEntry | string>) {
  return Promise.all(commands.map((c) => {
    if (typeof c === 'string') {
      return exec(c).promise()
    }
    return exec(c.command, c.options).promise()
  }))
}

export async function execSerie(commands: Array<ExecEntry | string>) {
  for (let i = 0; i < commands.length; i++) {
    const c = commands[i];
    if (typeof c === 'string') {
      await exec(c).promise()
    } else {
      await exec(c.command, c.options).promise()
    }
  }
}
