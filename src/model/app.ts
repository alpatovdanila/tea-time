import { createEvent } from '../lib/nanoevent'
import { createStore } from '../lib/nanostore'
import { lockScreenSleep, vibrate } from '../lib/device'
import { counter } from './counter'
import { soundManager } from '../ui/sounds'

export enum ErrorType {
  warning,
  critical,
  debug,
}

type Error = { type: ErrorType; title: string; text: string; err: unknown }

export const $errors = createStore<Array<Error>>([])

export const errorHappened = createEvent<Error>()

$errors.on(errorHappened, (errors, newError) => [...errors, newError])

export const appStarted = createEvent()

appStarted.addListener(lockScreenSleep)

export const $soundEnabled = createStore(true)
export const $vibrationEnabled = createStore(false)

export const toggleSound = createEvent()
export const toggleVibration = createEvent()

$soundEnabled.on(toggleSound, (old) => !old)
$vibrationEnabled.on(toggleVibration, (old) => !old)

counter.nearEnded.addListener(async () => {
  if ($soundEnabled.get()) await soundManager.play('done')
  if ($vibrationEnabled.get()) vibrate(300)
})

counter.ended.addListener(async () => {
  if ($soundEnabled.get()) {
    await soundManager.play('done')
    await soundManager.play('done')
  }
  if ($vibrationEnabled.get()) vibrate(500)
})
