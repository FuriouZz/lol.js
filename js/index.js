"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _Array = __importStar(require("./array"));
var _Collections = __importStar(require("./collections"));
var _Object = __importStar(require("./object"));
var _Pipe = __importStar(require("./pipe"));
var _Promise = __importStar(require("./promise"));
var _String = __importStar(require("./string"));
var _Dispatcher = __importStar(require("./dispatcher"));
var _Emitter = __importStar(require("./emitter"));
var _Error = __importStar(require("./error"));
var _Function = __importStar(require("./function"));
exports._ = {
    array: _Array,
    collections: _Collections,
    object: _Object,
    pipe: _Pipe,
    promise: _Promise,
    string: _String,
    dispatcher: _Dispatcher,
    emitter: _Emitter,
    error: _Error,
    function: _Function,
};
