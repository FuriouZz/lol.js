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

export function metadata($video: HTMLVideoElement) : VideoMetadata {
  return {
    url: $video.src,
    width: $video.videoWidth,
    height: $video.videoHeight,
    ratio: $video.videoWidth / $video.videoHeight,
    poster: $video.poster
  }
}

export function load(url: string) {
  return new Promise<VideoData>((resolve, reject) => {
    const $video = document.createElement('video')

    function onLoadedMetaData() {
      $video.removeEventListener('loadedmetadata', onLoadedMetaData)
      resolve({
        element: $video,
        ...metadata($video)
      })
    }

    $video.onerror = (e) => {
      reject(e)
    }

    $video.addEventListener('loadedmetadata', onLoadedMetaData)
    $video.src = url
  })
}