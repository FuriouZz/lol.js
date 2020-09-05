"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Fs = __importStar(require("fs"));
var filelist_1 = require("filelist");
var path_1 = require("path");
var index_1 = require("../promise/index");
var child_process_1 = require("child_process");
filelist_1.FileList.debug = false;
function isFile(path) {
    try {
        var stat = Fs.statSync(path);
        if (!stat.isFile())
            throw 'Not a file';
    }
    catch (e) {
        return false;
    }
    return true;
}
exports.isFile = isFile;
function isDirectory(path) {
    try {
        var stat = Fs.statSync(path);
        if (!stat.isDirectory())
            throw 'Not a file';
    }
    catch (e) {
        return false;
    }
    return true;
}
exports.isDirectory = isDirectory;
function exists(path) {
    try {
        Fs.statSync(path);
    }
    catch (e) {
        return false;
    }
    return true;
}
exports.exists = exists;
function copy(fromFile, toFile) {
    return new Promise(function (resolve, reject) {
        var fileValid = fromFile !== toFile;
        if (!fileValid)
            throw "Cannot copy '" + fromFile + "' to the same path";
        fileValid = isFile(fromFile);
        if (!fileValid)
            throw "'" + fromFile + "' is not a file";
        ensureDir(path_1.dirname(toFile)).then(function () {
            var rs = Fs.createReadStream(fromFile);
            var ws = Fs.createWriteStream(toFile);
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
exports.copy = copy;
function remove(path) {
    if (isDirectory(path))
        return removeDir(path);
    return new Promise(function (resolve, reject) {
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
exports.remove = remove;
function removeDir(dir) {
    return __awaiter(this, void 0, void 0, function () {
        var files, i, dirs, j;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    files = fetch(path_1.join(dir, '**/*'));
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < files.length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, remove(files[i])];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    dirs = fetchDirs(path_1.join(dir, '**/*')).reverse();
                    for (j = 0; j < dirs.length; j++) {
                        Fs.rmdirSync(dirs[j]);
                    }
                    Fs.rmdirSync(dir);
                    return [2 /*return*/, true];
            }
        });
    });
}
exports.removeDir = removeDir;
function mkdir(dir) {
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
exports.mkdir = mkdir;
function move(fromFile, toFile) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, copy(fromFile, toFile)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, remove(fromFile)];
            }
        });
    });
}
exports.move = move;
function rename(fromFile, toFile) {
    return move(fromFile, toFile);
}
exports.rename = rename;
function ensureDir(path) {
    return __awaiter(this, void 0, void 0, function () {
        var dirs, initial, slash, res, d, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    path = path_1.normalize(path);
                    if (isDirectory(path))
                        return [2 /*return*/, new Promise(function (resolve) { return resolve(true); })];
                    dirs = path.split(/\\|\//);
                    initial = path_1.isAbsolute(path) ? dirs.shift() : '.';
                    slash = process.platform == 'win32' ? '\\' : '/';
                    res = initial;
                    d = '';
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < dirs.length)) return [3 /*break*/, 4];
                    d = dirs[i];
                    if (d === '.')
                        return [3 /*break*/, 3];
                    res += slash + d;
                    if (!!isDirectory(res)) return [3 /*break*/, 3];
                    return [4 /*yield*/, mkdir(res)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.ensureDir = ensureDir;
function fetch(include, exclude) {
    var FL = new filelist_1.FileList;
    var includes = Array.isArray(include) ? include : [include];
    var excludes = Array.isArray(exclude) ? exclude : exclude ? [exclude] : [];
    includes.forEach(function (inc) { return FL.include(inc); });
    excludes.forEach(function (exc) { return FL.exclude(exc); });
    var files = [];
    try {
        files = FL.toArray();
    }
    catch (e) { }
    files = files.filter(function (file) {
        return isFile(file);
    });
    return files;
}
exports.fetch = fetch;
function fetchDirs(include, exclude) {
    var FL = new filelist_1.FileList;
    var includes = Array.isArray(include) ? include : [include];
    var excludes = Array.isArray(exclude) ? exclude : exclude ? [exclude] : [];
    includes.forEach(function (inc) { return FL.include(inc); });
    excludes.forEach(function (exc) { return FL.exclude(exc); });
    var files = FL.toArray().filter(function (file) {
        return isDirectory(file);
    });
    return files;
}
exports.fetchDirs = fetchDirs;
function writeFile(content, file) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ensureDir(path_1.dirname(file))];
                case 1:
                    _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            Fs.writeFile(file, content, function (err) {
                                if (err) {
                                    reject(err);
                                    return;
                                }
                                resolve(true);
                            });
                        })];
            }
        });
    });
}
exports.writeFile = writeFile;
function readFile(file, options) {
    if (!isFile(file))
        throw 'This is not a file.';
    return new Promise(function (resolve, reject) {
        Fs.readFile(file, options, function (err, data) {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });
}
exports.readFile = readFile;
function editFile(file, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var content, modified;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, readFile(file)];
                case 1:
                    content = _a.sent();
                    return [4 /*yield*/, callback(content)];
                case 2:
                    modified = _a.sent();
                    return [2 /*return*/, writeFile(modified, file)];
            }
        });
    });
}
exports.editFile = editFile;
function appendFile(content, file) {
    return new Promise(function (resolve, reject) {
        Fs.appendFile(file, content, function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve(true);
            }
        });
    });
}
exports.appendFile = appendFile;
function isSymbolicLink(path) {
    try {
        var stats = Fs.statSync(path);
        if (!stats.isSymbolicLink())
            throw 'Not a symbolic link';
    }
    catch (e) {
        return false;
    }
    return true;
}
exports.isSymbolicLink = isSymbolicLink;
function symlink(fromPath, toPath) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!path_1.isAbsolute(fromPath))
                        fromPath = path_1.join(process.cwd(), fromPath);
                    if (!path_1.isAbsolute(toPath))
                        toPath = path_1.join(process.cwd(), toPath);
                    if (isSymbolicLink(toPath) || exists(toPath)) {
                        throw "Cannot create a symbolic link at " + toPath;
                    }
                    return [4 /*yield*/, ensureDir(path_1.dirname(toPath))];
                case 1:
                    _a.sent();
                    return [2 /*return*/, index_1.promise(function (resolve, reject) {
                            Fs.symlink(fromPath, toPath, function (err) {
                                if (err) {
                                    reject(err);
                                    return;
                                }
                                resolve(true);
                            });
                        })];
            }
        });
    });
}
exports.symlink = symlink;
function symlink2(fromPath, toPath, shell) {
    if (shell === void 0) { shell = process.platform == 'win32' ? 'cmd' : 'bash'; }
    return __awaiter(this, void 0, void 0, function () {
        var command;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (exists(toPath))
                        throw "Cannot create a symbolic link at " + toPath;
                    command = '';
                    if (!path_1.isAbsolute(fromPath))
                        fromPath = path_1.join(process.cwd(), fromPath);
                    if (!path_1.isAbsolute(toPath))
                        toPath = path_1.join(process.cwd(), toPath);
                    return [4 /*yield*/, ensureDir(path_1.dirname(toPath))];
                case 1:
                    _a.sent();
                    if (process.platform == 'win32') {
                        command = "mklink /D \"" + toPath + "\" \"" + fromPath + "\"";
                    }
                    else {
                        command = "ln -s " + fromPath + " " + toPath;
                    }
                    return [2 /*return*/, index_1.promise(function (resolve, reject) {
                            var cmd = command.split(' ');
                            var cli = cmd.shift();
                            var ps = child_process_1.spawnSync(cli, cmd, { shell: shell });
                            if (ps.error) {
                                reject(ps.error);
                            }
                            else {
                                resolve(true);
                            }
                        })];
            }
        });
    });
}
exports.symlink2 = symlink2;
function touch(path) {
    var id = Fs.openSync(path, 'w');
    Fs.closeSync(id);
    return true;
}
exports.touch = touch;
function mkdirSync(dir, throwOnError) {
    try {
        Fs.mkdirSync(dir);
    }
    catch (e) {
        if (throwOnError)
            throw e;
        return false;
    }
    return true;
}
exports.mkdirSync = mkdirSync;
function ensureDirSync(path, throwOnError) {
    path = path_1.normalize(path);
    if (isDirectory(path))
        return true;
    var dirs = path.split(/\\|\//);
    var initial = path_1.isAbsolute(path) ? dirs.shift() : '.';
    var slash = process.platform == 'win32' ? '\\' : '/';
    var res = initial;
    var d = '';
    for (var i = 0; i < dirs.length; i++) {
        d = dirs[i];
        if (d === '.')
            continue;
        res += slash + d;
        if (!isDirectory(res))
            mkdirSync(res, throwOnError);
    }
}
exports.ensureDirSync = ensureDirSync;
function writeFileSync(content, file, throwOnError) {
    ensureDirSync(path_1.dirname(file));
    try {
        Fs.writeFileSync(file, content);
    }
    catch (e) {
        if (throwOnError)
            throw e;
        return false;
    }
    return true;
}
exports.writeFileSync = writeFileSync;
function editFileSync(file, callback, throwOnError) {
    var content = Fs.readFileSync(file);
    var modified = callback(content);
    return writeFileSync(modified, file, throwOnError);
}
exports.editFileSync = editFileSync;
