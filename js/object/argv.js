"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
var KEY_REG = /^-{1,2}/;
var EQUAL_REG = /=/;
function parse(argv) {
    var parameters = {};
    var key = '';
    var index = 0;
    for (var i = 0; i < argv.length; i++) {
        var arg = argv[i];
        if (arg.match(KEY_REG)) {
            var split = arg.split(EQUAL_REG);
            key = split[0].replace(KEY_REG, '');
            if (split[1]) {
                parameters[key] = split[1];
            }
            else if (argv[i + 1] && !argv[i + 1].match(KEY_REG)) {
                parameters[key] = argv[i + 1];
                i++;
            }
            else {
                parameters[key] = true;
            }
            continue;
        }
        else {
            parameters[index] = arg;
            index++;
        }
    }
    return parameters;
}
exports.parse = parse;
