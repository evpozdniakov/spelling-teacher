import {
  SAVE,
  _GROUP,
} from '../constants'

export function saveGroup(title, words) {
  return {
    type: SAVE + _GROUP,
    data: {title, words},
  }
}
