import { Sound, soundManager } from '../ui/sound'
import { lockScreenSleep, vibrate } from '../lib/device'
import { counter } from './counter'

import { $soundEnabled, $vibrationEnabled } from './userPreferences'
import { appStarted } from './app'

counter.nearEnded.addListener(async () => {
  if ($soundEnabled.get()) soundManager.play(Sound.caution)
  if ($vibrationEnabled.get()) vibrate(300)
})

counter.ended.addListener(() => {
  if ($soundEnabled.get()) {
    soundManager.play(Sound.ding)
  }
  if ($vibrationEnabled.get()) vibrate(500)
})

$vibrationEnabled.addListener((enabled) => {
  if (enabled) vibrate(300)
})

appStarted.addListener(lockScreenSleep)
