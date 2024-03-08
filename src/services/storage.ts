import { createNamespacedStorage } from '../lib/storage'
import { createStore } from '../lib/nanite'

const storage = createNamespacedStorage('TeaTime')

export const createPersistedStore = <T>(initialValue: T, key: string) => {
  const value = storage.get<T>(key)
  const store = createStore<T>(value === null ? initialValue : value)
  store.addListener((newValue) => storage.set(key, newValue))
  return store
}
