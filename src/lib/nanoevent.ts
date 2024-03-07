// https://gist.github.com/alpatovdanila/e3d9402d7cf25444cc887bf5e038c378
/*
  Usage:
  const somethingHappened = createEvent()
  somethingHappened.addListener(() => console.log("I've heard that something happened"))
  somethingHappened()
*/

export type NanoEventListener<T> = (payload: T) => void

export type Event<E> = ReturnType<typeof createEvent<E>>

export const createEvent = <T = void>() => {
  const subscribers = new Set<NanoEventListener<T>>()

  const event = (payload: T) => [...subscribers].forEach((sub) => sub(payload))

  const removeListener = (listener: NanoEventListener<T>) =>
    subscribers.delete(listener)

  event.addListener = (listener: NanoEventListener<T>) => {
    subscribers.add(listener)
    return () => removeListener(listener)
  }

  event.addOnceListener = (listener: NanoEventListener<T>) => {
    const disposableListener: NanoEventListener<T> = (payload) => {
      listener(payload)
      removeListener(disposableListener)
    }
    return event.addListener(disposableListener)
  }

  event.reset = () => subscribers.clear()

  return event
}
