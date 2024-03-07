import { FunctionComponent } from 'preact'
import { cn } from '../../lib/cn'
import styles from './button.module.css'
import { useSquircle } from '../../services/squircle'
import { createRef, CSSProperties } from 'react'

export enum ButtonVariants {
  default,
  secondary,
  red,
}

type Props = {
  variant?: ButtonVariants
  onClick: () => void
  style?: CSSProperties
}

export const Button: FunctionComponent<Props> = ({
  variant = ButtonVariants.default,
  onClick,
  children,
  style,
}) => {
  const ref = createRef()

  const squircleProps = useSquircle({
    ref,
    borderRadius: 64,
    smoothness: 0.5,
  })

  const className = cn(
    styles.button,
    variant === ButtonVariants.default && styles.default,
    variant === ButtonVariants.secondary && styles.secondary,
    variant === ButtonVariants.red && styles.red,
  )

  return (
    <div
      className={styles.hole}
      {...squircleProps}
      onClick={onClick}
      style={style}
    >
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
