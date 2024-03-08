import { createEvent, createStore } from './nanite'

import { setPreciseInterval } from './preciseTimer/preciseTimer'

type CountDownOptions = {
  tickInterval?: number
  nearEndTicks?: number
  maxTicks?: number
}

export type CountDownState = {
  passed: number
  total: number
  left: number
}

export const initialState = {
  passed: 0,
  total: 0,
  left: 0,
}

export const createCountDown = ({
  tickInterval = 1,
  nearEndTicks = 5,
  maxTicks = 1000,
}: CountDownOptions = {}) => {
  const state = createStore<CountDownState>(initialState)

  const ended = createEvent()
  const nearEnded = createEvent()

  let interval: (() => void) | null = null

  const add = (ticks: number) => {
    stopTicking()

    state.set((old) => {
      const newTotal = Math.min(old.total + ticks, maxTicks)

      return {
        ...old,
        total: newTotal,
        left: newTotal - old.passed,
      }
    })

    startTicking()
  }

  const tick = () => {
    const passed = state.get().passed + 1
    const left = state.get().total - passed

    if (left === 0) {
      ended()
      clear()
      return
    }

    if (left === nearEndTicks && nearEndTicks) nearEnded()

    state.set((old) => {
      return {
        ...old,
        passed,
        left,
      }
    })
  }

  const stopTicking = () => interval && interval()

  const startTicking = () => (interval = setPreciseInterval(tick, tickInterval))

  const clear = () => {
    stopTicking()
    state.set(() => initialState)
  }

  return {
    add,
    state,
    ended,
    clear,
    nearEnded,
  }
}

export type CountDown = ReturnType<typeof createCountDown>
