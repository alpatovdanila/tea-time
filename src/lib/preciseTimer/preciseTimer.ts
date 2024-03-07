export const setPreciseInterval = (fn: () => void, timeout: number) => {
  const worker = new Worker(new URL('worker.ts', import.meta.url).href)
  worker.postMessage({ interval: timeout })
  worker.addEventListener('message', (e) => {
    if (e.data.tick) fn()
  })

  return () => {
    worker.terminate()
  }
}
