import {
  OPEN,
  _MAIN,
  _PAGE,
} from '../constants'

export function openMainPage() {
  return {
    type: OPEN + _MAIN + _PAGE,
    data: {},
  }
}
