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
exports.loadAudio = exports.getAudioMetadata = void 0;
function getAudioMetadata($audio) {
    return {
        url: $audio.src,
        duration: $audio.duration
    };
}
exports.getAudioMetadata = getAudioMetadata;
function loadAudio(url, beforeLoad) {
    return new Promise(function (resolve, reject) {
        var $audio = document.createElement('audio');
        if (typeof beforeLoad === "function")
            beforeLoad($audio);
        $audio.addEventListener("error", reject, { once: true });
        $audio.addEventListener('loadedmetadata', function () {
            resolve(__assign({ element: $audio }, getAudioMetadata($audio)));
        }, { once: true });
        $audio.src = url;
    });
}
exports.loadAudio = loadAudio;
