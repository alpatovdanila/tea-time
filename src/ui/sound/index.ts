import caution from './almost.wav'
import ding from './done.wav'
import { createSoundManager } from '../../lib/soundManager'

export enum Sound {
  ding,
  caution,
}

export const soundManager = createSoundManager({
  [Sound.caution]: caution,
  [Sound.ding]: ding,
})
