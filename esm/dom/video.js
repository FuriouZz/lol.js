export function getVideoMetadata($video) {
    return {
        url: $video.src,
        width: $video.videoWidth,
        height: $video.videoHeight,
        ratio: $video.videoWidth / $video.videoHeight,
        poster: $video.poster
    };
}
export function load(url, beforeLoad) {
    return new Promise((resolve, reject) => {
        const $video = document.createElement('video');
        if (typeof beforeLoad === "function")
            beforeLoad($video);
        $video.addEventListener("error", reject, { once: true });
        $video.addEventListener('loadedmetadata', () => {
            resolve(Object.assign({ element: $video }, getVideoMetadata($video)));
        }, { once: true });
        $video.src = url;
    });
}
