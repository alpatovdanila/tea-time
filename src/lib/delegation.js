export const delegatedHandler = (selector, handler) => (event) => {
  const possibleTarget = event.target.closest(selector)
  if (possibleTarget) {
    event.delegateTarget = possibleTarget
    handler(event)
  }
}
