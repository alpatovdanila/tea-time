import { createEvent } from './nanoevent'
import { createStore } from './nanostore'
import { useEffect, useState } from 'preact/hooks'

type CountDownOptions = {
  tickInterval?: number
  nearEndTicks?: number
}

type CountDownState = {
  passed: number
  total: number
  left: number
}

const initialState = {
  passed: 0,
  total: 0,
  left: 0,
}

export const createCountDown = ({
  tickInterval = 1,
  nearEndTicks = 5,
}: CountDownOptions = {}) => {
  const state = createStore<CountDownState>(initialState)

  const ended = createEvent()
  const nearEnded = createEvent()

  let interval: number | null = null

  const add = (ticks: number) => {
    stopTicking()

    state.set((old) => ({
      ...old,
      total: old.total + ticks,
      left: old.total + ticks - old.passed,
    }))

    startTicking()
  }

  const tick = () => {
    const passed = state.get().passed + 1
    const left = state.get().total - passed

    if (left === 0) {
      ended()
      stopTicking()
    }

    if (left === nearEndTicks && nearEndTicks) nearEnded()

    if (left >= 0) {
      state.set((old) => ({
        ...old,
        passed,
        left,
      }))
    }
  }

  const stopTicking = () => interval && clearInterval(interval)

  const startTicking = () => (interval = setInterval(tick, tickInterval))

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

type CountDown = ReturnType<typeof createCountDown>

export const useCountDown = (countDown: CountDown) => {
  const [state, setState] = useState(countDown.state.get())

  useEffect(() => countDown.state.addListener(setState), [])

  return state
}
