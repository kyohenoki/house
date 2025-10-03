import { OverlayScrollbars } from 'overlayscrollbars'

export function scrollbars() {
  const dark = window.matchMedia('(prefers-color-scheme: dark').matches
  const theme = dark ? 'os-theme-light' : 'os-theme-dark'
  OverlayScrollbars(document.body, {
    scrollbars: {
      autoHide: 'move',
      theme: theme,
    },
  })
}
