export interface ImageMetadata {
  url: string
  width: number
  height: number
  ratio: number
}

export interface ImageData extends ImageMetadata {
  element: HTMLImageElement
}

export function metadata($img: HTMLImageElement) : ImageMetadata {
  return {
    url: $img.src,
    width: $img.naturalWidth,
    height: $img.naturalHeight,
    ratio: $img.naturalWidth / $img.naturalHeight
  }
}

export function load(url: string) {
  return new Promise<ImageData>((resolve, reject) => {
    const $img = new Image()
    $img.onload = () => {
      resolve({
        element: $img,
        ...metadata($img)
      })
    }
    $img.onerror = (e) => {
      reject(e)
    }
    $img.src = url
  })
}