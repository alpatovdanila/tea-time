addEventListener('message', (event) => {
  if (event.data.interval) {
    run(event.data.interval)
  }
})

const run = (length: number) => {
  let time = performance.now()

  while (true) {
    const currentTime = performance.now()
    if (currentTime - time >= length) {
      postMessage({ tick: currentTime - time })
      time = currentTime
    }
  }
}
