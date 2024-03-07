import { Button, ButtonVariants } from './ui/button'

import { counter } from './model/counter'
import { useCountDown } from './lib/countDown'

export function App() {
  const state = useCountDown(counter)

  return (
    <div>
      <h1>
        {state.left}/{state.total}
      </h1>
      <Button variant={ButtonVariants.default} onClick={() => counter.add(10)}>
        +10
      </Button>

      <Button variant={ButtonVariants.default} onClick={() => counter.add(20)}>
        +20
      </Button>
      <Button variant={ButtonVariants.default} onClick={() => counter.clear()}>
        reset
      </Button>
    </div>
  )
}
