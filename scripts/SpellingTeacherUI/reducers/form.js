import {
  CHANGE,
  SAVE,
  _FORM,
  _GROUP,
  _FIELD,
} from '../constants'

export default (state={}, action) => {
  const { type, data } = action

  switch (type) {
    case CHANGE + _FORM + _FIELD:
      return {
        ...state,
        [data.name]: data.value,
      }

    case SAVE + _GROUP:
      return {
        ...state,
        title: '',
        words: '',
      }

    default:
      return state
  }
}

export function getInitState(data) {
  const {
    title='',
    words='',
  } = data || {}

  return {
    title,
    words,
  }
}

export function serializeState(data) {
  return data
}
