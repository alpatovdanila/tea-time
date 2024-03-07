import { createSquircleMask, SquircleTargetAttributes } from '../lib/squircle'
import { resizeObserver } from './resizeObserver'

import { useEffect, useState } from 'preact/hooks'
import { RefObject } from 'preact'

type Props = {
  ref: RefObject<HTMLElement>
  borderRadius: number
  smoothness: number
  invert?: boolean
}

export const useSquircle = ({ ref, borderRadius, smoothness }: Props) => {
  const [attributes, setAttributes] = useState<SquircleTargetAttributes>({})

  useEffect(() => {
    if (ref.current) {
      const squircleMask = createSquircleMask(0, 0, borderRadius, smoothness)

      setAttributes(squircleMask.targetAtributes)

      resizeObserver.observe(ref.current, ({ width, height }) => {
        squircleMask.update(width, height, borderRadius, smoothness)
      })

      return () => {
        resizeObserver.unobserve(ref.current)
        squircleMask.remove()
      }
    }
  }, [borderRadius, smoothness])

  return attributes
}
