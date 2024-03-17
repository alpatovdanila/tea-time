import { counter } from './counter'
import { $soundEnabled, $vibrationEnabled } from './userPreferences'
import { Sound, soundManager } from '../ui/sound'
import { lockScreenSleep, vibrate } from '../lib/device'

let revokeScreenSleepLock: null | (() => void) = null

counter.nearEnded.addListener(async () => {
  if ($soundEnabled.get()) soundManager.play(Sound.doubleFast)
  if ($vibrationEnabled.get()) vibrate(300)
})

counter.ended.addListener(() => {
  if ($soundEnabled.get()) {
    soundManager.play(Sound.doubleSlow)
  }
  if ($vibrationEnabled.get()) vibrate(500)
})

$vibrationEnabled.addListener((enabled) => {
  if (enabled) vibrate(300)
})

$soundEnabled.addListener((enabled) => {
  if (enabled) soundManager.play(Sound.single)
})

counter.started.addListener(async () => {
  revokeScreenSleepLock = await lockScreenSleep()
})

counter.ended.addListener(() => revokeScreenSleepLock?.())
