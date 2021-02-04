var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as Fs from "fs";
import { FileList } from "filelist";
import { normalize, dirname, isAbsolute, join } from "path";
import { spawnSync } from "child_process";
FileList.debug = false;
export function isFile(path) {
    try {
        const stat = Fs.statSync(path);
        if (!stat.isFile())
            throw 'Not a file';
    }
    catch (e) {
        return false;
    }
    return true;
}
export function isDirectory(path) {
    try {
        const stat = Fs.statSync(path);
        if (!stat.isDirectory())
            throw 'Not a file';
    }
    catch (e) {
        return false;
    }
    return true;
}
export function exists(path) {
    try {
        Fs.statSync(path);
    }
    catch (e) {
        return false;
    }
    return true;
}
export function copy(fromFile, toFile) {
    return new Promise(function (resolve, reject) {
        let fileValid = fromFile !== toFile;
        if (!fileValid)
            throw `Cannot copy '${fromFile}' to the same path`;
        fileValid = isFile(fromFile);
        if (!fileValid)
            throw `'${fromFile}' is not a file`;
        ensureDir(dirname(toFile)).then(function () {
            const rs = Fs.createReadStream(fromFile);
            const ws = Fs.createWriteStream(toFile);
            ws.on('error', function (error) {
                reject(error);
            });
            rs.on('error', function (error) {
                reject(error);
            });
            rs.on('end', function () {
                resolve(true);
            });
            rs.pipe(ws, { end: true });
        });
    });
}
export function remove(path) {
    if (isDirectory(path))
        return removeDir(path);
    return new Promise((resolve, reject) => {
        if (!isFile(path))
            throw 'Cannot be removed. This is not a file.';
        Fs.unlink(path, function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(true);
        });
    });
}
export function removeDir(dir) {
    return __awaiter(this, void 0, void 0, function* () {
        const files = fetch(join(dir, '**/*'));
        for (let i = 0; i < files.length; i++) {
            yield remove(files[i]);
        }
        const dirs = fetchDirs(join(dir, '**/*')).reverse();
        for (let j = 0; j < dirs.length; j++) {
            Fs.rmdirSync(dirs[j]);
        }
        Fs.rmdirSync(dir);
        return true;
    });
}
export function mkdir(dir) {
    return new Promise(function (resolve, reject) {
        Fs.mkdir(dir, function (err) {
            if (err && err.code !== 'EEXIST') {
                reject(err);
                return;
            }
            resolve(true);
        });
    });
}
export function move(fromFile, toFile) {
    return __awaiter(this, void 0, void 0, function* () {
        yield copy(fromFile, toFile);
        return remove(fromFile);
    });
}
export function rename(fromFile, toFile) {
    return move(fromFile, toFile);
}
export function ensureDir(path) {
    return __awaiter(this, void 0, void 0, function* () {
        path = normalize(path);
        if (isDirectory(path))
            return new Promise((resolve) => resolve(true));
        const dirs = path.split(/\\|\//);
        const initial = isAbsolute(path) ? dirs.shift() : '.';
        const slash = process.platform == 'win32' ? '\\' : '/';
        let res = initial;
        let d = '';
        for (let i = 0; i < dirs.length; i++) {
            d = dirs[i];
            if (d === '.')
                continue;
            res += slash + d;
            if (!isDirectory(res))
                yield mkdir(res);
        }
    });
}
export function fetch(include, exclude) {
    const FL = new FileList;
    const includes = Array.isArray(include) ? include : [include];
    const excludes = Array.isArray(exclude) ? exclude : exclude ? [exclude] : [];
    includes.forEach((inc) => FL.include(inc));
    excludes.forEach((exc) => FL.exclude(exc));
    let files = [];
    try {
        files = FL.toArray();
    }
    catch (e) { }
    files = files.filter(function (file) {
        return isFile(file);
    });
    return files;
}
export function fetchDirs(include, exclude) {
    const FL = new FileList;
    const includes = Array.isArray(include) ? include : [include];
    const excludes = Array.isArray(exclude) ? exclude : exclude ? [exclude] : [];
    includes.forEach((inc) => FL.include(inc));
    excludes.forEach((exc) => FL.exclude(exc));
    const files = FL.toArray().filter(function (file) {
        return isDirectory(file);
    });
    return files;
}
export function writeFile(file, content) {
    return __awaiter(this, void 0, void 0, function* () {
        yield ensureDir(dirname(file));
        return new Promise((resolve, reject) => {
            Fs.writeFile(file, content, function (err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(true);
            });
        });
    });
}
export function readFile(file, options) {
    if (!isFile(file))
        throw 'This is not a file.';
    return new Promise((resolve, reject) => {
        Fs.readFile(file, options, function (err, data) {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });
}
export function editFile(file, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        const content = yield readFile(file);
        const modified = yield callback(content);
        return writeFile(file, modified);
    });
}
export function appendFile(file, content) {
    return new Promise((resolve, reject) => {
        Fs.appendFile(file, content, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(true);
            }
        });
    });
}
export function isSymbolicLink(path) {
    try {
        const stats = Fs.statSync(path);
        if (!stats.isSymbolicLink())
            throw 'Not a symbolic link';
    }
    catch (e) {
        return false;
    }
    return true;
}
export function symlink(fromPath, toPath) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!isAbsolute(fromPath))
            fromPath = join(process.cwd(), fromPath);
        if (!isAbsolute(toPath))
            toPath = join(process.cwd(), toPath);
        if (isSymbolicLink(toPath) || exists(toPath)) {
            throw `Cannot create a symbolic link at ${toPath}`;
        }
        yield ensureDir(dirname(toPath));
        return new Promise((resolve, reject) => {
            Fs.symlink(fromPath, toPath, function (err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(true);
            });
        });
    });
}
export function symlink2(fromPath, toPath, shell = process.platform == 'win32' ? 'cmd' : 'bash') {
    return __awaiter(this, void 0, void 0, function* () {
        if (exists(toPath))
            throw `Cannot create a symbolic link at ${toPath}`;
        let command = '';
        if (!isAbsolute(fromPath))
            fromPath = join(process.cwd(), fromPath);
        if (!isAbsolute(toPath))
            toPath = join(process.cwd(), toPath);
        yield ensureDir(dirname(toPath));
        if (process.platform == 'win32') {
            command = `mklink /D "${toPath}" "${fromPath}"`;
        }
        else {
            command = `ln -s ${fromPath} ${toPath}`;
        }
        return new Promise((resolve, reject) => {
            const cmd = command.split(' ');
            const cli = cmd.shift();
            const ps = spawnSync(cli, cmd, { shell: shell });
            if (ps.error) {
                reject(ps.error);
            }
            else {
                resolve(true);
            }
        });
    });
}
export function touch(path) {
    const id = Fs.openSync(path, 'w');
    Fs.closeSync(id);
    return true;
}
export function ensureDirSync(path) {
    path = normalize(path);
    if (isDirectory(path))
        return;
    const dirs = path.split(/\\|\//);
    const initial = isAbsolute(path) ? dirs.shift() : '.';
    const slash = process.platform == 'win32' ? '\\' : '/';
    let res = initial;
    let d = '';
    for (let i = 0; i < dirs.length; i++) {
        d = dirs[i];
        if (d === '.')
            continue;
        res += slash + d;
        if (!isDirectory(res))
            Fs.mkdirSync(res);
    }
}
export function writeFileSync(file, content) {
    ensureDirSync(dirname(file));
    Fs.writeFileSync(file, content);
}
export function editFileSync(file, callback) {
    const content = Fs.readFileSync(file);
    const modified = callback(content);
    return writeFileSync(file, modified);
}
export function removeSync(path) {
    if (isDirectory(path))
        return removeDirSync(path);
    if (!isFile(path))
        throw 'Cannot be removed. This is not a file.';
    Fs.unlinkSync(path);
}
export function removeDirSync(dir) {
    const files = fetch(join(dir, '**/*'));
    for (let i = 0; i < files.length; i++) {
        removeSync(files[i]);
    }
    const dirs = fetchDirs(join(dir, '**/*')).reverse();
    for (let j = 0; j < dirs.length; j++) {
        Fs.rmdirSync(dirs[j]);
    }
    Fs.rmdirSync(dir);
}
