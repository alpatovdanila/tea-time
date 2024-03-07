import { createEvent, Event, NanoEventListener } from './nanoevent'

type ValueReducer<T, E> = (oldValue: T, eventValue: E) => T

type ValueSetter<T> = (oldValue: T) => T

export const createStore = <T>(initialValue: T) => {
  let value = initialValue
  const event = createEvent<T>()

  const get = () => value

  const set = (setter: ValueSetter<T>) => {
    event((value = setter(get())))
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
