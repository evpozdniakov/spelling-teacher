import {
  OPEN,
  _GROUP,
  _FORM,
  _DICTIONARY,
  _SETTINGS,
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

export function openSettings() {
  return {
    type: OPEN + _SETTINGS,
    data: {},
  }
}
