import { generateSquircleSVG } from './squircleSVGGenerator'
import { useEffect, useMemo } from 'preact/hooks'
import { nanoid } from 'nanoid'
import { observe, unobserve } from '../resizeObserver'
import { RefObject } from 'preact'

type Props = {
  ref: RefObject<null | HTMLElement>
  borderRadius: number
  smoothness: number
  invert?: boolean
}

export const useSquircleStyle = ({
  ref,
  borderRadius,
  smoothness,
  invert = false,
}: Props) => {
  const id = useMemo(() => 'sqrql_' + nanoid(4), [])

  useEffect(() => {
    if (ref.current) {
      const style = document.createElement('style')
      style.id = id

      observe(ref.current, ({ blockSize, inlineSize }) => {
        const svg = generateSquircleSVG(
          inlineSize,
          blockSize,
          borderRadius,
          smoothness,
          invert ? 'black' : 'white',
          invert ? 'white' : 'black',
        )

        style.textContent = `
          [data-sqrql-id="${id}"]{
            mask-image: url("data:image/svg+xml,${svg}");
            mask-mode: luminance;
          }
        `
      })

      document.head.appendChild(style)
    }

    return () => {
      document.getElementById(id)!.remove()
      ref.current && unobserve(ref.current)
    }
  }, [])

  return useMemo(() => ({ 'data-sqrql-id': id }), [id])
}
