import {
  createEvent,
  Event,
  EventMethods,
  NanoEventListener,
} from './nanoevent'
import { useEffect, useState } from 'preact/hooks'

type ValueReducer<T, E> = (oldValue: T, eventValue: E) => T

type ValueSetter<T> = (oldValue: T) => T

type Store<T> = EventMethods<T> & {
  on: <E>(event: Event<E>, reducer: ValueReducer<T, E>) => void
  get: () => T
  set: (setter: ValueSetter<T>) => void
}

export const createStore = <T>(initialValue: T): Store<T> => {
  let value = initialValue
  const event = createEvent<T>()

  const get = () => value

  const set = (setter: ValueSetter<T>) => {
    const newValue = setter(value)
    if (newValue !== value) event((value = newValue))
  }

  const addListener = (listener: NanoEventListener<T>) => {
    listener(get())
    return event.addListener(listener)
  }

  const on = <E>(event: Event<E>, reducer: ValueReducer<T, E>) =>
    event.addListener((eventValue) =>
      set((oldValue) => reducer(oldValue, eventValue)),
    )

  return {
    ...event,
    addListener,
    on,
    get,
    set,
  }
}

export const useStore = <T>(store: Store<T>) => {
  const [state, setState] = useState<T>(store.get())
  useEffect(() => store.addListener(setState), [store])
  return state
}
