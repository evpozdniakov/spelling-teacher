import { SETTINGS_ELEMENT } from './config'
import applyCssRule from 'dynamic-css-rules'

export function changeElementColor(element, color) {
  if (color && color.rgb) {
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
      case SETTINGS_ELEMENT.BODY_TEXT:
        applyCssRule(`body {color: ${color.hex}}`)
        break
      case SETTINGS_ELEMENT.NAV_TEXT:
        styleNavText(color)
        break
      case SETTINGS_ELEMENT.NAV_BACKGROUND:
        applyCssRule(`.navbar {background-color: ${color.hex}}`)
        break
      case SETTINGS_ELEMENT.PROGRESS_BACKGROUND:
        applyCssRule(`.progress {background-color: ${color.hex}}`)
        break
      case SETTINGS_ELEMENT.PROGRESS_COLOR:
        applyCssRule(`.progress-bar {background-color: ${color.hex}}`)
        break
      case SETTINGS_ELEMENT.TABLE_BORDER_COLOR:
        applyCssRule(`.table td, .table th {border-top: 1px solid ${color.hex}}`)
        break
    }
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

function styleNavText(color) {
  const { r, g, b } = color.rgb

  applyCssRule(`.navbar-light .navbar-nav .active>.nav-link, .navbar-light .navbar-nav .nav-link.active, .navbar-light .navbar-nav .nav-link.show, .navbar-light .navbar-nav .show>.nav-link {
    color: rgba(${r}, ${g}, ${b}, 0.9)
  }`)

  applyCssRule(`.navbar-light .navbar-nav .nav-link {
    color: rgba(${r}, ${g}, ${b}, 0.5)
  }`)

  applyCssRule(`.navbar-light .navbar-nav .nav-link:focus, .navbar-light .navbar-nav .nav-link:hover {
    color: rgba(${r}, ${g}, ${b}, 0.7)
  }`)

  applyCssRule(`.navbar-light .navbar-nav .nav-link.disabled {
    color: rgba(${r}, ${g}, ${b}, 0.3)
  }`)
}
