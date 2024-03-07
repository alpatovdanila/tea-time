import { errorHappened, ErrorType } from '../model/app'

navigator.wakeLock.request = () => Promise.reject()

export const lockScreenSleep = async () => {
  let lock: WakeLockSentinel | null = null

  const request = async () => {
    try {
      lock = await navigator.wakeLock.request('screen')
      lock.addEventListener('release', () => (lock = null), { once: true })
    } catch (err) {
      errorHappened({
        type: ErrorType.warning,
        title: 'Screen Wake Lock not available',
        text: 'Can not retrieve wake lock handle',
        err,
      })
    }
  }

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && !lock) request()
  })

  request()
}

export const vibrate = (time: number) => navigator.vibrate(time)
