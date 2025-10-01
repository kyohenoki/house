import { OverlayScrollbars } from 'overlayscrollbars'

export function scrollbars() {
  OverlayScrollbars(document.body, {
    scrollbars: {
      autoHide: 'move',
    },
  })
}
