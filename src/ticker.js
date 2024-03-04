import { createEvent } from './lib/nanoevent.js'

let time = 0

export const tick = createEvent()
export const ended = createEvent()

export const addTime = (milliseconds) => (time += milliseconds)

export const getTime = () => time

export const clear = () => {
  time = 0
  tick()
}

setInterval(() => {
  if (time > 0) {
    time -= 1000
    tick()
    if (time <= 0) ended()
  }

  if (time < 0) {
    time = 0
  }
}, 1000)
