"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function loadFile(file, type, beforeLoad) {
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        if (typeof beforeLoad === "function")
            beforeLoad(reader);
        reader.addEventListener("error", reject, { once: true });
        reader.addEventListener("load", function () {
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
        }, { once: true });
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
exports.loadFile = loadFile;
