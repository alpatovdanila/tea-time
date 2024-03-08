import { Button, ButtonVariants } from '../../ui/button'
import { add, reset } from '../../model/counter'
import { toggleSound, toggleVibration } from '../../model/app'
import { Trash2, Volume2, Waves } from 'lucide-react'
import styles from './controls.module.css'

export const Controls = () => {
  return (
    <div class={styles.controls}>
      <Button onClick={() => add(60)}>60</Button>
      <Button onClick={() => add(30)}>30</Button>
      <Button onClick={() => add(15)}>15</Button>
      <Button onClick={() => add(10)}>10</Button>
      <Button onClick={() => add(5)}>5</Button>
      <Button
        onClick={() => reset()}
        variant={ButtonVariants.red}
        style={{ gridArea: 'clear' }}
      >
        <Trash2 size={'7vmin'} strokeWidth={2} />
      </Button>
      <Button onClick={() => toggleSound()} variant={ButtonVariants.secondary}>
        <Volume2 size={'7vmin'} strokeWidth={2} />
      </Button>
      <Button
        onClick={() => toggleVibration()}
        variant={ButtonVariants.secondary}
      >
        <Waves size={'7vmin'} strokeWidth={2} />
      </Button>
    </div>
  )
}
