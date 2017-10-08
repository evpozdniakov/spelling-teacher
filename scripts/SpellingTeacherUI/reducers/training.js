import {
  CHANGE,
  START,
  _SPELLING,
  _TRAINING,
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

    case START + _TRAINING:
      return {
        ...state,
        groupId: data.groupId,
      }

    default:
      return state
  }
}

export function getInitState(data) {
  const {
    userSpelling = '',
    groupId = null,
  } = data || {}

  return {
    userSpelling,
    groupId,
  }
}

export function serializeState(data) {
  return data
}
