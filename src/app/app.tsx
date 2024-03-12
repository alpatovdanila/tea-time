import { useEffect, useRef } from 'preact/hooks'
import { appStarted } from '../model/app'
import { Screen } from '../components/screen/screen'
import { Controls } from '../components/controls/controls'
import styles from './app.module.css'
import '../model/device'

import { useSquircle } from '../services/squircle'
import { useStore } from '../lib/naniteReact'
import { $modalWindow } from '../model/ui'
import { Alert } from '../ui/modal/alert'

export function App() {
  useEffect(appStarted, [])
  const modal = useStore($modalWindow)
  const ref = useRef<HTMLDivElement>(null)
  const squircledProps = useSquircle({ ref, borderRadius: 32, smoothness: 0.5 })

  return (
    <>
      {modal && <Alert {...modal} />}
      <div className={styles.app} {...squircledProps} ref={ref}>
        <div className={styles.top}>
          <Screen />
        </div>
        <div className={styles.bottom}>
          <Controls />
        </div>
      </div>
    </>
  )
}
