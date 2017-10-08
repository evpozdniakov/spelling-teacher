import {
  OPEN,
  _GROUP,
  _FORM,
  _MAIN,
  _PAGE,
} from '../constants'

export function openMainPage() {
  return {
    type: OPEN + _MAIN + _PAGE,
    data: {},
  }
}

export function openGroupForm(id = null) {
  return {
    type: OPEN + _GROUP + _FORM,
    data: {id},
  }
}
