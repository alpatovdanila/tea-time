import { useEffect, useState } from 'preact/hooks'
import { NanoStore } from '../nanite'
import { Event, NanoEventHandler } from '../nanite'

export const useStore = <T>(store: NanoStore<T>) => {
  const [state, setState] = useState<T>(store.get())
  useEffect(() => store.addListener(setState), [store])
  return state
}

export const useEvent = <E>(event: Event<E>, handler: NanoEventHandler<E>) => {
  useEffect(() => event.addListener(handler), [event, handler])
}
