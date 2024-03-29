import { nanoid } from 'nanoid'

// https://codepen.io/Scooby-Dooku/pen/abKqEYo
export const generateSquircleSVG = (
  width: number,
  height: number,
  radius: number,
  curvature: number,
  color: string,
  bgColor: string,
) => {
  let cornerAnchor = radius
  let cornerHandle = curvature

  //Calculate the midpoint of the shortest side, ie the width / 2 if height is larger than width, otherwise height / 2.
  const half = height > width ? width / 2 : height / 2

  //Make sure that the set cornerSize is not larger than the applicable half point or the shape would break and look weird.
  if (half < cornerAnchor) {
    cornerAnchor = half
  } else {
    cornerAnchor = radius
  }

  //Calculate the length of the straight horizontal and vertical paths between the cubic bezier curve anchors.
  let hSides = width - cornerAnchor * 2
  let vSides = height - cornerAnchor * 2

  return `<svg xmlns='http://www.w3.org/2000/svg' xml:space='preserve' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'><rect width='${width}' height='${height}' fill='${bgColor}'></rect><path d='M0,${cornerAnchor} C0,${cornerHandle} ${cornerHandle},0 ${cornerAnchor},0 h${hSides} c${cornerAnchor - cornerHandle},0 ${cornerAnchor},${cornerHandle} ${cornerAnchor},${cornerAnchor} v${vSides} c0,${cornerAnchor - cornerHandle} -${cornerHandle},${cornerAnchor} -${cornerAnchor},${cornerAnchor} h-${hSides} c-${cornerAnchor - cornerHandle},0 -${cornerAnchor},-${cornerHandle} -${cornerAnchor},-${cornerAnchor} v-${vSides}Z' fill='${color}'></path></svg>`
}

export type SquircleTargetAttributes = Record<string, string>

export const createSquircleMask = (
  width: number,
  height: number,
  borderRadius: number,
  smoothness: number,
) => {
  const id = 'sqrql_' + nanoid(4)
  const style = document.createElement('style')
  style.id = id

  const update = (
    width: number,
    height: number,
    borderRadius: number,
    smoothness: number,
  ) => {
    const svg = generateSquircleSVG(
      width,
      height,
      borderRadius,
      smoothness,
      'white',
      'black',
    )

    style.textContent = `
      [data-sqrql-id="${id}"]{
        mask-image: url("data:image/svg+xml,${svg}");
        mask-mode: luminance;
      }
    `
  }

  document.head.appendChild(style)

  const remove = () => style.remove()

  update(width, height, borderRadius, smoothness)

  return {
    update,
    remove,
    targetAtributes: {
      'data-sqrql-id': id,
    },
  }
}
