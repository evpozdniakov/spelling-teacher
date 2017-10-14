import {
  OPEN,
  _GROUP,
  _FORM,
  _DICTIONARY,
} from '../constants'

export function openDictionary() {
  return {
    type: OPEN + _DICTIONARY,
    data: {},
  }
}

export function openGroupForm(id = null) {
  return {
    type: OPEN + _GROUP + _FORM,
    data: {id},
  }
}
