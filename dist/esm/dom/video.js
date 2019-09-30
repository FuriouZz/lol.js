export function metadata($video) {
    return {
        url: $video.src,
        width: $video.videoWidth,
        height: $video.videoHeight,
        ratio: $video.videoWidth / $video.videoHeight,
        poster: $video.poster
    };
}
export function load(url) {
    return new Promise((resolve, reject) => {
        const $video = document.createElement('video');
        function onLoadedMetaData() {
            $video.removeEventListener('loadedmetadata', onLoadedMetaData);
            resolve(Object.assign({ element: $video }, metadata($video)));
        }
        $video.addEventListener('loadedmetadata', onLoadedMetaData);
        $video.src = url;
    });
}
