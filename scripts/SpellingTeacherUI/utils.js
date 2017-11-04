import { SETTINGS_ELEMENT } from './config'
import applyCssRule from 'dynamic-css-rules'

export function changeElementColor(element, color) {
  switch (element) {
    case SETTINGS_ELEMENT.PRIMARY_BUTTON:
      styleButton('btn-primary', color)
      break
    case SETTINGS_ELEMENT.SECONDARY_BUTTON:
      styleButton('btn-secondary', color)
      styleOutlineButton('btn-outline-secondary', color)
      break
    case SETTINGS_ELEMENT.DANGER_BUTTON:
      styleOutlineButton('btn-outline-danger', color)
      break
    case SETTINGS_ELEMENT.TABLE_CELL_WARNING:
      styleTable('table-warning', color)
      break
    case SETTINGS_ELEMENT.TABLE_CELL_SUCCESS:
      styleTable('table-success', color)
      break
    case SETTINGS_ELEMENT.TEXT_COLOR:
      applyCssRule(`body {color: ${color.hex}}`)
      break
  }
}

function styleButton(className, color) {
  applyCssRule(`.${className} {
    background-color: ${color.hex};
    border-color: ${color.hex}
  }`)

  applyCssRule(`.${className}:disabled {
    background-color: ${color.hex};
    border-color: ${color.hex};
    opacity: 0.65
  }`)

  let { hsl, rgb } = color
  let { r, g, b} = rgb;
  let h = hsl.h
  let s = `${hsl.s * 100}%`
  let l = `${Math.max(0, hsl.l * 100 - 8)}%`

  applyCssRule(`.${className}:hover, .${className}:active {
    background-color: hsl(${h}, ${s}, ${l});
    border-color: hsl(${h}, ${s}, ${l})
  }`)

  applyCssRule(`.${className}:focus {
    box-shadow: 0 0 0 3px rgba(${r}, ${g}, ${b}, 0.5)
  }`)
}

function styleOutlineButton(className, color) {
  applyCssRule(`.${className} {
    color: ${color.hex};
    border-color: ${color.hex}
  }`)

  applyCssRule(`.${className}:hover, .${className}:active {
    background-color: ${color.hex};
    color: #fff;
    border-color: ${color.hex}
  }`)

  let { r, g, b} = color.rgb;

  applyCssRule(`.${className}:focus {
    box-shadow: 0 0 0 3px rgba(${r}, ${g}, ${b}, 0.5)
  }`)
}

function styleTable(className, color) {
  applyCssRule(`.${className}, .${className}>td, .${className}>th {
    background-color: ${color.hex}
  }`)
}
