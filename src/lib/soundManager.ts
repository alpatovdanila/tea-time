import { createStore } from './nanite'
import { loadAudio } from './sound'

export const createSoundManager = <T extends Record<string, string>>(
  assets: T,
) => {
  const isReady = createStore(false)

  const audios: Record<string, HTMLAudioElement> = {}

  const preload = async () => {
    for (const key of Object.keys(assets)) {
      const path = assets[key]
      audios[key] = await loadAudio(new URL(path, import.meta.url).href)
    }

    isReady.set(() => true)
  }

  const play = (name: keyof T) => {
    if (isReady.get() && name in audios) {
      const audio = audios[name as keyof typeof audios]
      audio.currentTime = 0
      return audio.play()
    }
  }

  preload()

  return {
    play,
    ready: isReady,
  }
}
