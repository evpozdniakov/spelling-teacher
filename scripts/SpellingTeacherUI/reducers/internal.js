import {
  ADD,
  EDIT,
  OPEN,
  SAVE,
  _FORM,
  _GROUP,
  _MAIN,
  _PAGE,
} from '../constants'

export default (state = {}, action) => {
  const { type, data } = action

  switch (type) {
    case ADD + _GROUP:
      return {
        ...state,
        mode: _FORM,
        groupId: null,
      }

    case EDIT + _GROUP:
      return {
        ...state,
        mode: _FORM,
        groupId: data.id,
      }

    case OPEN + _MAIN + _PAGE:
    case SAVE + _GROUP:
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
