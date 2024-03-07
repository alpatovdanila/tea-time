const resizeListeners = new Map()

const resizeObserver = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const listener = resizeListeners.get(entry.target)
    if (listener) listener(entry.borderBoxSize[0])
  })
})

export const observe = (
  element: HTMLElement,
  listener: (size: ResizeObserverSize) => void,
) => {
  resizeObserver.observe(element)
  resizeListeners.set(element, listener)
}

export const unobserve = (element: HTMLElement) => {
  resizeObserver.unobserve(element)
  resizeListeners.delete(element)
}
