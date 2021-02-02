export interface VideoMetadata {
  url: string
  width: number
  height: number
  ratio: number
  poster?: string
}

export interface VideoData extends VideoMetadata {
  element: HTMLVideoElement
}

export function getVideoMetadata($video: HTMLVideoElement) : VideoMetadata {
  return {
    url: $video.src,
    width: $video.videoWidth,
    height: $video.videoHeight,
    ratio: $video.videoWidth / $video.videoHeight,
    poster: $video.poster
  }
}

export type VideoBeforeLoad = (element: HTMLVideoElement) => void

export function load(url: string, beforeLoad?: VideoBeforeLoad) {
  return new Promise<VideoData>((resolve, reject) => {
    const $video = document.createElement('video')
    if (typeof beforeLoad === "function") beforeLoad($video)
    $video.addEventListener("error", reject, { once: true })
    $video.addEventListener('loadedmetadata', () => {
      resolve({
        element: $video,
        ...getVideoMetadata($video)
      })
    }, { once: true })
    $video.src = url
  })
}