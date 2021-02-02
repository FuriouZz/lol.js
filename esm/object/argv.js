const KEY_REG = /^-{1,2}/;
const EQUAL_REG = /=/;
export function parse(argv) {
    const parameters = {};
    let key = '';
    let index = 0;
    for (let i = 0; i < argv.length; i++) {
        const arg = argv[i];
        if (arg.match(KEY_REG)) {
            const split = arg.split(EQUAL_REG);
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
