import {
  OPEN,
  _FORM,
  _GROUP,
  _MAIN,
  _PAGE,
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

    case OPEN + _MAIN + _PAGE:
      return {
        ...state,
        mode: _MAIN + _PAGE,
      }

    default:
      return state
  }
}

export function getInitState(data) {
  const {
    mode = _FORM,
    groupId = null,
  } = data || {}

  return {
    mode,
    groupId,
  }
}

export function serializeState(data) {
  return data
}
