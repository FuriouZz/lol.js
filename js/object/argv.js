"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parse(argv) {
    var parameters = {};
    var key = '';
    var keyRegex = /^-{1,2}/;
    var index = 0;
    for (var i = 0; i < argv.length; i++) {
        var arg = argv[i];
        if (arg.match(keyRegex)) {
            var split = arg.split(/=/);
            key = split[0].replace(keyRegex, '');
            if (split[1]) {
                parameters[key] = split[1];
            }
            else if (argv[i + 1] && !argv[i + 1].match(keyRegex)) {
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
