export const cn = (...classes: Array<unknown>) =>
  classes.filter(Boolean).join(' ')
