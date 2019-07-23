"use strict";
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
            resolve(metadata($video));
        }
        $video.addEventListener('loadedmetadata', onLoadedMetaData);
        $video.src = url;
    });
}
exports.load = load;
