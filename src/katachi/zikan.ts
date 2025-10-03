import { format, isValid, parse } from 'date-fns'

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

export function miseru(zi: string) {
  const kata = parse(zi, 'yyyy/MM/dd HH:mm', new Date())
  // もし変換できない、つまり変だったり未入力なら
  if (isValid(kata)) {
    return format(kata, 'yyyy年M月d日 H:mm')
  } else {
    return '時間が未設定'
  }
}

export function tomili(tx: string, fm: string) {
  let fmm = fm
  if (fmm === 'd') {
    fmm = 'yyyy/MM/dd HH:mm'
  }
  const kata = parse(tx, fmm, new Date())
  return kata.getTime()
}
