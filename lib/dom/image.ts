export interface ImageMetadata {
  url: string
  width: number
  height: number
  ratio: number
}

export interface ImageData extends ImageMetadata {
  element: HTMLImageElement
}

export function getImageMetadata($img: HTMLImageElement) : ImageMetadata {
  return {
    url: $img.src,
    width: $img.naturalWidth,
    height: $img.naturalHeight,
    ratio: $img.naturalWidth / $img.naturalHeight
  }
}

export type ImageBeforeLoad = (element: HTMLImageElement) => void

export function loadImage(url: string, beforeLoad?: ImageBeforeLoad) {
  return new Promise<ImageData>((resolve, reject) => {
    const $img = new Image()
    if (typeof beforeLoad === "function") beforeLoad($img)
    $img.addEventListener("load", () => {
      resolve({
        element: $img,
        ...getImageMetadata($img)
      })
    }, { once: true })
    $img.addEventListener("error", reject, { once: true })
    $img.src = url
  })
}