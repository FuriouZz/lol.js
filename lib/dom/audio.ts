export interface AudioMetadata {
  url: string
  duration: number
}

export function metadata($audio: HTMLAudioElement) : AudioMetadata {
  return {
    url: $audio.src,
    duration: $audio.duration
  }
}

export function load(url: string) {
  return new Promise<AudioMetadata & { element: HTMLAudioElement }>((resolve, reject) => {
    const $audio = document.createElement('audio')

    function onLoadedMetaData() {
      $audio.removeEventListener('loadedmetadata', onLoadedMetaData)
      resolve({
        element: $audio,
        ...metadata($audio)
      })
    }

    $audio.addEventListener('loadedmetadata', onLoadedMetaData)
    $audio.src = url
  })
}