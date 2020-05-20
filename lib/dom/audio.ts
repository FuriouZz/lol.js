export interface AudioMetadata {
  url: string
  duration: number
}

export interface AudioData extends AudioMetadata {
  element: HTMLAudioElement
}

export function metadata($audio: HTMLAudioElement) : AudioMetadata {
  return {
    url: $audio.src,
    duration: $audio.duration
  }
}

export function load(url: string) {
  return new Promise<AudioData>((resolve, reject) => {
    const $audio = document.createElement('audio')

    function onLoadedMetaData() {
      $audio.removeEventListener('loadedmetadata', onLoadedMetaData)
      resolve({
        element: $audio,
        ...metadata($audio)
      })
    }

    $audio.onerror = (e) => {
      reject(e)
    }

    $audio.addEventListener('loadedmetadata', onLoadedMetaData)
    $audio.src = url
  })
}