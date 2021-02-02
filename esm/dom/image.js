export function getImageMetadata($img) {
    return {
        url: $img.src,
        width: $img.naturalWidth,
        height: $img.naturalHeight,
        ratio: $img.naturalWidth / $img.naturalHeight
    };
}
export function loadImage(url, beforeLoad) {
    return new Promise((resolve, reject) => {
        const $img = new Image();
        if (typeof beforeLoad === "function")
            beforeLoad($img);
        $img.addEventListener("load", () => {
            resolve(Object.assign({ element: $img }, getImageMetadata($img)));
        }, { once: true });
        $img.addEventListener("error", reject, { once: true });
        $img.src = url;
    });
}
