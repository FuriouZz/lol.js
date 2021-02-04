"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveAs = void 0;
function saveAs(data, filename, type) {
    if (filename === void 0) { filename = 'file.json'; }
    if (type === void 0) { type = 'application/json'; }
    return new Promise(function (resolve) {
        var blob = new Blob([data], { type: type });
        var $a = document.createElement('a');
        var url = URL.createObjectURL(blob);
        $a.href = url;
        $a.download = filename;
        document.body.appendChild($a);
        $a.click();
        setTimeout(function () {
            document.body.removeChild($a);
            window.URL.revokeObjectURL(url);
            resolve();
        }, 100);
    });
}
exports.saveAs = saveAs;
