export function metadata($audio) {
    return {
        url: $audio.src,
        duration: $audio.duration
    };
}
export function load(url) {
    return new Promise((resolve, reject) => {
        const $audio = document.createElement('audio');
        function onLoadedMetaData() {
            $audio.removeEventListener('loadedmetadata', onLoadedMetaData);
            resolve(Object.assign({ element: $audio }, metadata($audio)));
        }
        $audio.addEventListener('loadedmetadata', onLoadedMetaData);
        $audio.src = url;
    });
}
