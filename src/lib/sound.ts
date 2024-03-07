export const createSound = (url: string) => {
  const audio = new Audio()
  audio.src = url

  return new Promise<HTMLAudioElement>((resolve) => {
    audio.addEventListener(
      'canplaythrough',
      () => {
        resolve(audio)
      },
      {
        once: true,
      },
    )
  })
}
