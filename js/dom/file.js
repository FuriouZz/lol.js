"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function load(file, type) {
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.onerror = reject;
        reader.onload = function () {
            if (!reader.result) {
                reject('[FileReader] No result found');
                return;
            }
            resolve({
                file: file,
                type: type,
                reader: reader,
                response: reader.result
            });
        };
        reader.onerror = function (e) {
            reject(e);
        };
        if (type == 'arraybuffer') {
            reader.readAsArrayBuffer(file);
        }
        else if (type == 'binarystring') {
            reader.readAsBinaryString(file);
        }
        else if (type == 'dataurl') {
            reader.readAsDataURL(file);
        }
        else if (type == 'text') {
            reader.readAsText(file);
        }
    });
}
exports.load = load;
