import {
  CHANGE,
  _SPELLING,
  _USER,
} from '../constants'

export default (state = {}, action) => {
  const { type, data } = action

  switch (type) {
    case CHANGE + _USER + _SPELLING:
      return {
        ...state,
        userSpelling: data.string,
      }

    default:
      return state
  }
}

export function getInitState(data) {
  const {
    userSpelling = '',
  } = data || {}

  return {
    userSpelling,
  }
}

export function serializeState(data) {
  return data
}
