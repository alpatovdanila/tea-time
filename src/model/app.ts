import { createEvent } from '../lib/nanite'
import { add, reset } from './counter'

export const appStarted = createEvent()

appStarted.addListener(() => {
  const startingTimeParam = new URL(document.location.href).searchParams.get(
    'start',
  )

  if (startingTimeParam) {
    const startingTime = Number(startingTimeParam)
    if (!isNaN(startingTime) && startingTime > 0) {
      reset()
      add(Number(startingTime))
    }
  }
})
