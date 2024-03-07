import { FunctionComponent } from 'preact'
import { cn } from '../../lib/cn'
import styles from './button.module.css'
import { useSquircleStyle } from '../../lib/squircle'
import { createRef } from 'react'

export enum ButtonVariants {
  default,
  secondary,
  red,
}

type Props = {
  variant: ButtonVariants
}

export const Button: FunctionComponent<Props> = ({
  variant = ButtonVariants.default,
  children,
}) => {
  const ref = createRef()

  const squircleProps = useSquircleStyle({
    ref,
    borderRadius: 32,
    smoothness: 0.5,
  })

  const className = cn(
    styles.button,
    variant === ButtonVariants.default && styles.default,
    variant === ButtonVariants.secondary && styles.secondary,
    variant === ButtonVariants.red && styles.red,
  )

  return (
    <div className={styles.hole} {...squircleProps}>
      <button className={className} ref={ref} {...squircleProps}>
        {/*absolutely positioned "real" text, being absolutely positioned, does not declare size of button container
        so there is hidden text of the same size and width that is direct child of button and positioned relatively*/}
        <div className={cn(styles.text, styles.hidden)}>{children}</div>
        <div className={styles.shadow} />
        <div className={styles.topSurface} {...squircleProps}>
          <div className={styles.text}>{children}</div>
          <div className={styles.light} />
        </div>
      </button>
    </div>
  )
}
