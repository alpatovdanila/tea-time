import { createCountDown } from '../lib/countDown'

import { createPersistedStore } from '../services/storage'

export const counter = createCountDown({
  tickInterval: 1000,
  nearEndTicks: 5,
  maxTicks: 999,
})

export const add = counter.add

export const reset = () => {
  if (counter.state.get().isRunning) {
    counter.clear()
  } else {
    $previous.set(() => 0)
  }
}

export const $counter = counter.state
export const $previous = createPersistedStore(0, 'lastCounter')

$previous.on(counter.ended, () => $counter.get().total)
