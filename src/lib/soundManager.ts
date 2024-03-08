import { createStore } from './nanostore'
import { loadAudio } from './sound'

type SoundsAssetsMap = Record<string, string>

export const createSoundManager = (assets: SoundsAssetsMap) => {
  const isReady = createStore(false)

  const audios: Record<string, HTMLAudioElement> = {}

  const preload = async () => {
    for (const key of Object.keys(assets)) {
      const path = assets[key]
      audios[key] = await loadAudio(new URL(path, import.meta.url).href)
    }

    isReady.set(() => true)
  }

  const play = (name: string) => {
    if (isReady.get() && name in audios) {
      const audio = audios[name]
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
