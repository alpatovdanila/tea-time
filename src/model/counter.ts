import { createCountDown } from '../lib/countDown'
import { createStore } from '../lib/nanostore'

export const counter = createCountDown({
  tickInterval: 1000,
  nearEndTicks: 5,
  maxTicks: 999,
})

export const add = counter.add
export const reset = counter.clear

export const $counter = counter.state
export const $previous = createStore(0)

$previous.on(counter.ended, () => $counter.get().total)
