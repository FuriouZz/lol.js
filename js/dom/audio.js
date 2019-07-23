"use strict";
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
            resolve(metadata($audio));
        }
        $audio.addEventListener('loadedmetadata', onLoadedMetaData);
        $audio.src = url;
    });
}
exports.load = load;
