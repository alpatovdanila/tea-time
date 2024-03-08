// https://gist.github.com/alpatovdanila/e3d9402d7cf25444cc887bf5e038c378
/*
  Usage:
  const somethingHappened = createEvent()
  somethingHappened.addListener(() => console.log("I've heard that something happened"))
  somethingHappened()
*/

export type NanoEventHandler<E> = (payload: E) => void

type InlineUnsubscribeFn = () => void

export type EventMethods<E> = {
  addListener: (listener: NanoEventHandler<E>) => InlineUnsubscribeFn
  addOnceListener: (listener: NanoEventHandler<E>) => InlineUnsubscribeFn
  reset: () => void
}

export type Event<E> = {
  (payload: E): void
} & EventMethods<E>

export const createEvent = <T = void>(): Event<T> => {
  const subscribers = new Set<NanoEventHandler<T>>()

  const event: Event<T> = (payload: T) =>
    [...subscribers].forEach((sub) => sub(payload))

  const removeListener = (listener: NanoEventHandler<T>) =>
    subscribers.delete(listener)

  event.addListener = (listener: NanoEventHandler<T>) => {
    subscribers.add(listener)
    return () => removeListener(listener)
  }

  event.addOnceListener = (listener: NanoEventHandler<T>) => {
    const disposableListener: NanoEventHandler<T> = (payload) => {
      listener(payload)
      removeListener(disposableListener)
    }
    return event.addListener(disposableListener)
  }

  event.reset = () => subscribers.clear()

  return event
}
