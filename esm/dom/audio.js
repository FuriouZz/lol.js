export function getAudioMetadata($audio) {
    return {
        url: $audio.src,
        duration: $audio.duration
    };
}
export function loadAudio(url, beforeLoad) {
    return new Promise((resolve, reject) => {
        const $audio = document.createElement('audio');
        if (typeof beforeLoad === "function")
            beforeLoad($audio);
        $audio.addEventListener("error", reject, { once: true });
        $audio.addEventListener('loadedmetadata', () => {
            resolve(Object.assign({ element: $audio }, getAudioMetadata($audio)));
        }, { once: true });
        $audio.src = url;
    });
}
