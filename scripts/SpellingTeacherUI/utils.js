import { SETTINGS_ELEMENT } from './config'
import applyCssRule from 'dynamic-css-rules'

export function changeElementColor(element, color) {
  switch (element) {
    case SETTINGS_ELEMENT.PRIMARY_BUTTON: {
      applyCssRule(`.btn-primary {
        background-color: ${color.hex};
        border-color: ${color.hex}
      }`)

      let { hsl } = color
      let h = hsl.h
      let s = `${hsl.s * 100}%`
      let l = `${Math.max(0, hsl.l * 100 - 8)}%`

      applyCssRule(`.btn-primary:hover {
        background-color: hsl(${h}, ${s}, ${l});
        border-color: hsl(${h}, ${s}, ${l})
      }`)

      break
    }
  }
}
