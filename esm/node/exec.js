var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { spawn } from 'child_process';
import { defer } from '../promise/defer';
export class Exec {
    constructor() {
        this.defer = defer();
        this.stdio = [undefined, undefined, undefined];
    }
    then(onfulfilled, onrejected) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.defer.promise.then(onfulfilled);
        });
    }
    catch(onrejected) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.defer.promise.catch(onrejected);
        });
    }
    promise() {
        return this.defer.promise;
    }
    run(command, options = {}) {
        options = Object.assign({
            shell: true,
            stdio: 'pipe',
            color: true,
            extendEnv: true,
        }, options);
        options.env = Object.assign({
            FORCE_COLOR: options.color
        }, options.extendEnv ? process.env : {}, options.env || {});
        const args = command.split(' ');
        const cmd = args.shift();
        if (typeof cmd !== 'string')
            throw new Error(`No command to execute`);
        const ps = spawn(cmd, args, options);
        let stdout = Buffer.from('');
        let stderr = Buffer.from('');
        if (ps.stdin) {
            this.stdin = ps.stdin;
            this.stdio[0] = ps.stdin;
        }
        if (ps.stdout) {
            this.stdout = ps.stdout;
            this.stdio[1] = ps.stdout;
        }
        if (ps.stderr) {
            this.stderr = ps.stderr;
            this.stdio[2] = ps.stderr;
        }
        if (ps.stdout && options.fetchStdout) {
            ps.stdout.on('data', function (d) {
                const b = typeof d === 'string' ? Buffer.from(d) : d;
                stdout = Buffer.concat([stdout, b]);
                // console.log(d.toString('utf-8'))
            });
        }
        if (ps.stderr && options.fetchStderr) {
            ps.stderr.on('data', function (d) {
                const b = typeof d === 'string' ? Buffer.from(d) : d;
                stderr = Buffer.concat([stderr, b]);
                // console.log(d.toString('utf-8'))
            });
        }
        ps.on('error', (error) => {
            // console.log(error)
            if (options.throwOnError) {
                this.defer.reject(error);
            }
        });
        ps.on('exit', (code, signal) => {
            this.defer.resolve({
                code,
                signal,
                stdout,
                stderr,
            });
        });
        return this;
    }
}
export function exec(command, options = {}) {
    const e = new Exec();
    return e.run(command, options);
}
export function execParallel(commands) {
    return Promise.all(commands.map((c) => {
        if (typeof c === 'string') {
            return exec(c).promise();
        }
        return exec(c.command, c.options).promise();
    }));
}
export function execSerie(commands) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < commands.length; i++) {
            const c = commands[i];
            if (typeof c === 'string') {
                yield exec(c).promise();
            }
            else {
                yield exec(c.command, c.options).promise();
            }
        }
    });
}
