import { createCountDown } from '../lib/countDown'

export const counter = createCountDown({
  tickInterval: 1000,
  nearEndTicks: 5,
})

counter.nearEnded.addListener(() => console.log('near ended!'))
counter.ended.addListener(() => console.log('ended!'))
