import single from './single.wav'
import doubleFast from './doubleFast.wav'
import doubleSlow from './doubleSlow.wav'
import { createSoundManager } from '../../lib/soundManager'

export enum Sound {
  doubleSlow,
  doubleFast,
  single,
}

export const soundManager = createSoundManager({
  [Sound.doubleSlow]: doubleSlow,
  [Sound.doubleFast]: doubleFast,
  [Sound.single]: single,
})
