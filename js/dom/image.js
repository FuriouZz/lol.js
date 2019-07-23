"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function metadata($img) {
    return {
        url: $img.src,
        width: $img.naturalWidth,
        height: $img.naturalHeight,
        ratio: $img.naturalWidth / $img.naturalHeight
    };
}
exports.metadata = metadata;
function load(url) {
    return new Promise(function (resolve, reject) {
        var $img = new Image();
        $img.onload = function () {
            resolve(metadata($img));
        };
        $img.onerror = function (e) {
            reject(e);
        };
        $img.src = url;
    });
}
exports.load = load;
