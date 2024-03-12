import { Button } from '../button'
import styles from './modal.module.css'
import { createRef } from 'react'
import { useSquircle } from '../../services/squircle'
import { hideModalWindow } from '../../model/ui'

export type AlertProps = {
  content: string
  title: string
}

export const Alert = ({ content, title }: AlertProps) => {
  const ref = createRef<HTMLDivElement>()
  const squircleProps = useSquircle({ ref, borderRadius: 32, smoothness: 0.5 })

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} ref={ref} {...squircleProps}>
        <div className={styles.header}>{title}</div>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
        <div className={styles.footer}>
          <Button onClick={hideModalWindow} block>
            OK
          </Button>
        </div>
      </div>
    </div>
  )
}
