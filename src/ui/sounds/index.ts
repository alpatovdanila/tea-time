import { createSound } from '../../lib/sound'
import { createStore } from '../../lib/nanostore'

const createSoundManager = (paths: Array<string>) => {
  const ready = createStore(false)
  const sounds: Record<string, HTMLAudioElement> = {}

  const preload = async () => {
    for (const sound of paths) {
      sounds[sound] = await createSound(
        new URL(sound + '.wav', import.meta.url).href,
      )
    }

    ready.set(() => true)
  }

  const play = (id: string) => {
    if (ready.get() && id in sounds) {
      sounds[id].currentTime = 0
      return sounds[id].play()
    }
  }

  preload()

  return {
    play,
    ready,
  }
}

export const soundManager = createSoundManager(['almost', 'done'])
