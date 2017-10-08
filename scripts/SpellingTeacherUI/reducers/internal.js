import {
  SAVE,
  _FORM,
  _GROUP,
  _TRAINING,
} from '../constants'

export default (state={}, action) => {
  const { type, data } = action

  switch (type) {
    case SAVE + _GROUP:
      return {
        ...state,
        mode: _TRAINING,
      }

    default:
      return state
  }
}

export function getInitState(data) {
  const {
    mode=_FORM
  } = data || {}

  return {
    mode,
  }
}

export function serializeState(data) {
  return data
}
