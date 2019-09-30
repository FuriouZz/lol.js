export function metadata($img) {
    return {
        url: $img.src,
        width: $img.naturalWidth,
        height: $img.naturalHeight,
        ratio: $img.naturalWidth / $img.naturalHeight
    };
}
export function load(url) {
    return new Promise((resolve, reject) => {
        const $img = new Image();
        $img.onload = () => {
            resolve(Object.assign({ element: $img }, metadata($img)));
        };
        $img.onerror = (e) => {
            reject(e);
        };
        $img.src = url;
    });
}
