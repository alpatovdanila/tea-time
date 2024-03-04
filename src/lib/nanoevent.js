export const createEvent = () => {
    let handlers = new Set()
    const event = (payload) => handlers.forEach(handler => handler(payload))

    event.addListener = handler => handlers.add(handler)

    return event
}