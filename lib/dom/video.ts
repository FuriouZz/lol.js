export interface VideoMetadata {
  url: string
  width: number
  height: number
  ratio: number
  poster?: string
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
  return new Promise<VideoMetadata & { element: HTMLVideoElement }>((resolve, reject) => {
    const $video = document.createElement('video')

    function onLoadedMetaData() {
      $video.removeEventListener('loadedmetadata', onLoadedMetaData)
      resolve({
        element: $video,
        ...metadata($video)
      })
    }

    $video.addEventListener('loadedmetadata', onLoadedMetaData)
    $video.src = url
  })
}