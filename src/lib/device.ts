import { errorHappened, ErrorType } from '../model/errors'

export const lockScreenSleep = async () => {
  let sentinel: WakeLockSentinel | null = null

  const request = async () => {
    try {
      sentinel = await navigator.wakeLock.request('screen')
      sentinel.addEventListener('release', () => (sentinel = null), {
        once: true,
      })
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
    if (document.visibilityState === 'visible' && !sentinel) request()
  })

  request()

  return () => sentinel && !sentinel.released && sentinel.release()
}

export const vibrate = (time: number) => navigator.vibrate(time)
