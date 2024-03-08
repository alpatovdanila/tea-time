import { useEffect, useRef } from 'preact/hooks'
import { appStarted } from '../model/app'
import { Screen } from '../components/screen/screen'
import { Controls } from '../components/controls/controls'
import styles from './app.module.css'
import '../model/device'

import { useSquircle } from '../services/squircle'

export function App() {
  useEffect(appStarted, [])
  const ref = useRef<HTMLDivElement>(null)
  const squircle = useSquircle({ ref, borderRadius: 32, smoothness: 0.5 })

  return (
    <div className={styles.app} {...squircle} ref={ref}>
      <div className={styles.top}>
        <Screen />
      </div>
      <div className={styles.bottom}>
        <Controls />
      </div>
    </div>
  )
}
