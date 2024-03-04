import { tick, ended, addTime, getTime, clear } from './ticker.js'
import { delegatedHandler } from './lib/delegation.js'
import { createSound } from './lib/sound.js'

import './style.css'

;(async () => {
  const completedAudio = await createSound(
    new URL('./assets/completed.wav', import.meta.url).href,
  )

  document.addEventListener(
    'click',
    delegatedHandler('[data-add-time]', (e) => {
      console.log('click')
      const time = Number(e.delegateTarget.dataset.addTime)
      addTime(time)
      render(getTime())
    }),
  )

  document.addEventListener(
    'click',
    delegatedHandler('[data-clear]', () => {
      clear()
    }),
  )

  const render = (time) => {
    document.querySelector('.time').innerHTML = time / 1000
  }

  tick.addListener(() => render(getTime()))

  ended.addListener(() => {
    completedAudio.play()
    navigator.vibrate(300)
  })
})()
