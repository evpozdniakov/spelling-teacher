import {
  CHANGE,
  OPEN,
  _FORM,
  _GROUP,
  _FIELD,
} from '../constants'

export default (state = {}, action) => {
  const { type, data } = action

  switch (type) {
    case OPEN + _GROUP + _FORM:
      return {
        ...state,
        id: data.id,
        title: data.title,
        words: data.words,
      }

    case CHANGE + _FORM + _FIELD:
      return {
        ...state,
        [data.name]: data.value,
      }

    default:
      return state
  }
}

export function getInitState(data) {
  const {
    title = '',
    words = '',
  } = data || {}

  return {
    title,
    words,
  }
}

export function serializeState(data) {
  return data
}
