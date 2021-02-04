"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.execSerie = exports.execParallel = exports.exec = exports.Exec = void 0;
var child_process_1 = require("child_process");
var defer_1 = require("../promise/defer");
var Exec = /** @class */ (function () {
    function Exec() {
        this.defer = defer_1.defer();
        this.stdio = [undefined, undefined, undefined];
    }
    Exec.prototype.then = function (onfulfilled, onrejected) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.defer.promise.then(onfulfilled)];
            });
        });
    };
    Exec.prototype.catch = function (onrejected) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.defer.promise.catch(onrejected)];
            });
        });
    };
    Exec.prototype.promise = function () {
        return this.defer.promise;
    };
    Exec.prototype.run = function (command, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        options = Object.assign({
            shell: true,
            stdio: 'pipe',
            color: true,
            extendEnv: true,
        }, options);
        options.env = Object.assign({
            FORCE_COLOR: options.color
        }, options.extendEnv ? process.env : {}, options.env || {});
        var args = command.split(' ');
        var cmd = args.shift();
        if (typeof cmd !== 'string')
            throw new Error("No command to execute");
        var ps = child_process_1.spawn(cmd, args, options);
        var stdout = Buffer.from('');
        var stderr = Buffer.from('');
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
                var b = typeof d === 'string' ? Buffer.from(d) : d;
                stdout = Buffer.concat([stdout, b]);
                // console.log(d.toString('utf-8'))
            });
        }
        if (ps.stderr && options.fetchStderr) {
            ps.stderr.on('data', function (d) {
                var b = typeof d === 'string' ? Buffer.from(d) : d;
                stderr = Buffer.concat([stderr, b]);
                // console.log(d.toString('utf-8'))
            });
        }
        ps.on('error', function (error) {
            // console.log(error)
            if (options.throwOnError) {
                _this.defer.reject(error);
            }
        });
        ps.on('exit', function (code, signal) {
            _this.defer.resolve({
                code: code,
                signal: signal,
                stdout: stdout,
                stderr: stderr,
            });
        });
        return this;
    };
    return Exec;
}());
exports.Exec = Exec;
function exec(command, options) {
    if (options === void 0) { options = {}; }
    var e = new Exec();
    return e.run(command, options);
}
exports.exec = exec;
function execParallel(commands) {
    return Promise.all(commands.map(function (c) {
        if (typeof c === 'string') {
            return exec(c).promise();
        }
        return exec(c.command, c.options).promise();
    }));
}
exports.execParallel = execParallel;
function execSerie(commands) {
    return __awaiter(this, void 0, void 0, function () {
        var i, c;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < commands.length)) return [3 /*break*/, 6];
                    c = commands[i];
                    if (!(typeof c === 'string')) return [3 /*break*/, 3];
                    return [4 /*yield*/, exec(c).promise()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, exec(c.command, c.options).promise()];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    i++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.execSerie = execSerie;
