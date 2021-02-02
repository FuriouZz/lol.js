export interface AudioMetadata {
  url: string
  duration: number
}

export interface AudioData extends AudioMetadata {
  element: HTMLAudioElement
}

export function getAudioMetadata($audio: HTMLAudioElement) : AudioMetadata {
  return {
    url: $audio.src,
    duration: $audio.duration
  }
}

export type AudioBeforeLoad = (element: HTMLAudioElement) => void

export function loadAudio(url: string, beforeLoad?: AudioBeforeLoad) {
  return new Promise<AudioData>((resolve, reject) => {
    const $audio = document.createElement('audio')
    if (typeof beforeLoad === "function") beforeLoad($audio)
    $audio.addEventListener("error", reject, { once: true })
    $audio.addEventListener('loadedmetadata', () => {
      resolve({
        element: $audio,
        ...getAudioMetadata($audio)
      })
    }, { once: true })
    $audio.src = url
  })
}