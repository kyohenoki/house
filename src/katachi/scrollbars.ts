import { OverlayScrollbars } from 'overlayscrollbars'

export function scrollbars() {
  let iro: 'os-theme-light' | 'os-theme-dark' = 'os-theme-dark'

  const getTheme = () => {
    const theme = window.matchMedia('(prefers-color-scheme: dark').matches
    return theme ? 'os-theme-light' : 'os-theme-dark'
  }

  const osInstance = OverlayScrollbars(document.body, {
    scrollbars: {
      autoHide: 'move',
      theme: getTheme(),
    },
  })

  window.matchMedia('(prefers-color-scheme: dark').addEventListener('change', (e) => {
    iro = e.matches ? 'os-theme-light' : 'os-theme-dark'
    osInstance.options({ scrollbars: { theme: iro } })
  })
}

// 25/10/03 22:19 追記
// favicon と同じようにスクロールバーもライトモードとダークモードに対応させた
// addEventListener で常に監視して、ページを見てる途中にダークモードになってもちゃんと切り替わるようにした
// 最近は Issue を見るようにもなってきた、確かに役に立つ、ChatGPT と組み合わせればもう最強
