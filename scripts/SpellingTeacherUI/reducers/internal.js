import {
  _FORM,
  _TRAINING,
} from '../constants'

export default (state={}, action) => {
  const { type, data } = action

  switch (type) {
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
