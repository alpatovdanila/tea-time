import styles from './counter.module.css'
import { cn } from '../../lib/cn'

export enum CounterVariant {
  default,
  small,
}

export const Counter = ({
  value,
  size = CounterVariant.default,
  showDots = false,
  active = true,
}: {
  value: number
  size?: CounterVariant
  showDots?: boolean
  active?: boolean
}) => {
  const stringifiedValue = String(value)
  const className = cn(
    styles.counter,
    size === CounterVariant.small && styles.small,
  )

  return (
    <div className={className}>
      {showDots && (
        <div className={cn(styles.dots, value % 2 !== 0 && styles.activeDots)}>
          :
        </div>
      )}
      <div className={styles.segments}>
        <div className={styles.inactiveSegments}>888</div>
        {active && (
          <div className={styles.activeSegments}>{stringifiedValue}</div>
        )}
      </div>
    </div>
  )
}
