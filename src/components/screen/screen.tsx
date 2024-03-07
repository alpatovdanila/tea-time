import { $counter, $previous } from '../../model/counter'
import { useStore } from '../../lib/nanostore'
import { $errors, $soundEnabled, $vibrationEnabled } from '../../model/app'
import styles from './screen.module.css'
import { Counter, CounterVariant } from './counter'
import {
  AlertTriangle,
  History,
  Timer,
  Volume2,
  VolumeX,
  Waves,
} from 'lucide-react'
import { cn } from '../../lib/cn'

export const Screen = () => {
  const timer = useStore($counter)
  const prevTimer = useStore($previous)
  const soundEnabled = useStore($soundEnabled)
  const vibrationEnabled = useStore($vibrationEnabled)
  const errors = useStore($errors)

  return (
    <div className={styles.screen}>
      <div className={styles.previous}>
        <History
          size={'3vmax'}
          strokeWidth={2}
          className={cn(styles.icon, prevTimer && styles.activeIcon)}
        />
        <Counter
          value={prevTimer}
          size={CounterVariant.small}
          active={!!prevTimer}
        />
      </div>
      <div className={styles.countDown}>
        <Counter value={timer.left} showDots={true} />
        <div class={styles.total}>
          <Timer
            size={'3vmax'}
            strokeWidth={2}
            className={cn(styles.icon, timer.total && styles.activeIcon)}
          />
          <Counter
            value={timer.total}
            size={CounterVariant.small}
            active={!!timer.total}
          />
        </div>
      </div>

      <div className={styles.indicators}>
        <Volume2
          size={'3vmax'}
          strokeWidth={2}
          className={cn(styles.icon, soundEnabled && styles.activeIcon)}
        />
        <VolumeX
          size={'3vmax'}
          strokeWidth={2}
          className={cn(styles.icon, !soundEnabled && styles.activeIcon)}
        />

        <Waves
          size={'3vmax'}
          strokeWidth={2}
          className={cn(styles.icon, vibrationEnabled && styles.activeIcon)}
        />
        <AlertTriangle
          size={'3vmax'}
          strokeWidth={2}
          className={cn(styles.icon, errors.length && styles.activeIcon)}
        />
      </div>
    </div>
  )
}
