import {
  CHANGE,
  _SPELLING,
  _USER,
} from '../constants'

export function changeUserSpelling(string) {
  return {
    type: CHANGE + _USER + _SPELLING,
    data: {string},
  }
}
