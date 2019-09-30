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
function metadata($video) {
    return {
        url: $video.src,
        width: $video.videoWidth,
        height: $video.videoHeight,
        ratio: $video.videoWidth / $video.videoHeight,
        poster: $video.poster
    };
}
exports.metadata = metadata;
function load(url) {
    return new Promise(function (resolve, reject) {
        var $video = document.createElement('video');
        function onLoadedMetaData() {
            $video.removeEventListener('loadedmetadata', onLoadedMetaData);
            resolve(__assign({ element: $video }, metadata($video)));
        }
        $video.addEventListener('loadedmetadata', onLoadedMetaData);
        $video.src = url;
    });
}
exports.load = load;
