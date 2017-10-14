import {
  OPEN,
  START,
  _DICTIONARY,
  _FORM,
  _GROUP,
  _MAIN,
  _PAGE,
  _TRAINING,
} from '../constants'

export default (state = {}, action) => {
  const { type, data } = action

  switch (type) {
    case OPEN + _GROUP + _FORM:
      return {
        ...state,
        mode: _FORM,
        groupId: data.groupId,
      }

    case OPEN + _DICTIONARY:
      return {
        ...state,
        mode: _DICTIONARY,
      }

    case START + _TRAINING:
      return {
        ...state,
        mode: _TRAINING,
      }

    default:
      return state
  }
}

export function getInitState(data) {
  var {
    mode = _FORM,
    groupId = null,
  } = data || {}

  if (mode === _MAIN + _PAGE) {
    mode = _DICTIONARY
  }

  return {
    mode,
    groupId,
  }
}

export function serializeState(data) {
  return data
}
