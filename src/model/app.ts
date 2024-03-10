import { createEvent } from '../lib/nanite'
import { add, reset } from './counter'

export const appStarted = createEvent()

appStarted.addListener(() => {
  const startingTime = new URL(document.location.href).searchParams.get('start')
  if (startingTime) {
    reset()
    add(Number(startingTime))
  }
})
