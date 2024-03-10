import { createEvent } from '../lib/nanite'
import { add, reset } from './counter'

export const appStarted = createEvent()

appStarted.addListener(() => {
  const start = new URL(document.location.href).searchParams.get('start')
  if (start) {
    reset()
    add(Number(start))
  }
})

document.body.onclick = () => {
  Notification.requestPermission().then(() => {
    if (Notification.permission === 'granted') {
      new Notification('Hi there!')
    }
  })
}
