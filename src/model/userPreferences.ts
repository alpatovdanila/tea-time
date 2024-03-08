import { createEvent } from '../lib/nanite'
import { createPersistedStore } from '../services/storage'

export const $soundEnabled = createPersistedStore(true, 'soundEnabled')
export const $vibrationEnabled = createPersistedStore(false, 'vibrationEnabled')

export const toggleSound = createEvent()
export const toggleVibration = createEvent()

$soundEnabled.on(toggleSound, (old) => !old)

$vibrationEnabled.on(toggleVibration, (old) => !old)
