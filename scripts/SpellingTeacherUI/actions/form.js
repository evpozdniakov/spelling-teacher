import {
  CHANGE,
  _FORM,
  _FIELD,
} from '../constants'

export function changeFormField(name, value) {
  return {
    type: CHANGE + _FORM + _FIELD,
    data: {name, value},
  }
}
