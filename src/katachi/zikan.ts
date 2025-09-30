import { format } from 'date-fns'

export function now(fm?: string) {
  const date = new Date()
  if (fm) {
    if (fm === 'd') {
      return format(date, 'yyyy/MM/dd HH:mm')
    } else {
      return format(date, fm)
    }
  } else {
    return date
  }
}
