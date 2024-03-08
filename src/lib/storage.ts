export const createNamespacedStorage = (namespace: string) => {
  const get = <T>(key: string): T | null => {
    const storedValue = localStorage.getItem(namespace + '_' + key)
    if (storedValue) return JSON.parse(storedValue) as T
    return null
  }

  const set = (key: string, value: any) => {
    localStorage.setItem(namespace + '_' + key, JSON.stringify(value))
  }

  const remove = (key: string) => {
    localStorage.removeItem(namespace + '_' + key)
  }

  return {
    set,
    get,
    remove,
  }
}
