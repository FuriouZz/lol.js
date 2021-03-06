"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadImage = exports.getImageMetadata = void 0;
function getImageMetadata($img) {
    return {
        url: $img.src,
        width: $img.naturalWidth,
        height: $img.naturalHeight,
        ratio: $img.naturalWidth / $img.naturalHeight
    };
}
exports.getImageMetadata = getImageMetadata;
function loadImage(url, beforeLoad) {
    return new Promise(function (resolve, reject) {
        var $img = new Image();
        if (typeof beforeLoad === "function")
            beforeLoad($img);
        $img.addEventListener("load", function () {
            resolve(__assign({ element: $img }, getImageMetadata($img)));
        }, { once: true });
        $img.addEventListener("error", reject, { once: true });
        $img.src = url;
    });
}
exports.loadImage = loadImage;
