export type ResizeObserverSize = { width: number; height: number }

export const createResizeObserver = () => {
  const resizeListeners = new Map()

  const resizeObserver = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      const listener = resizeListeners.get(entry.target)
      if (listener)
        listener({
          width: entry.borderBoxSize[0].inlineSize,
          height: entry.borderBoxSize[0].blockSize,
        })
    })
  })

  const observe = (
    element: HTMLElement,
    onResize: (size: ResizeObserverSize) => void,
  ) => {
    resizeObserver.observe(element)
    resizeListeners.set(element, onResize)
  }

  const unobserve = (element: HTMLElement) => {
    resizeObserver.unobserve(element)
    resizeListeners.delete(element)
  }

  return {
    observe,
    unobserve,
  }
}
