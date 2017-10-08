import {
  CHANGE,
  EDIT,
  SAVE,
  _FORM,
  _GROUP,
  _FIELD,
} from '../constants'

export default (state = {}, action) => {
  const { type, data } = action

  switch (type) {
    case EDIT + _GROUP:
      return {
        ...state,
        title: data.title,
        words: data.words,
      }

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
