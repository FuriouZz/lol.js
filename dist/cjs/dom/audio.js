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
function metadata($audio) {
    return {
        url: $audio.src,
        duration: $audio.duration
    };
}
exports.metadata = metadata;
function load(url) {
    return new Promise(function (resolve, reject) {
        var $audio = document.createElement('audio');
        function onLoadedMetaData() {
            $audio.removeEventListener('loadedmetadata', onLoadedMetaData);
            resolve(__assign({ element: $audio }, metadata($audio)));
        }
        $audio.onerror = function (e) {
            reject(e);
        };
        $audio.addEventListener('loadedmetadata', onLoadedMetaData);
        $audio.src = url;
    });
}
exports.load = load;
