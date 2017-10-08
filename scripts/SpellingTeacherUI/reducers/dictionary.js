import {
  SAVE,
  _GROUP,
} from '../constants'

export default (state={}, action) => {
  const { type, data } = action

  switch (type) {
    case SAVE + _GROUP: {
      let { title, words } = data
      let group = {title, words}

      return {
        ...state,
        groups: cloneGroups(state).concat(group),
      }
    }

    default:
      return state
  }
}

export function getInitState(data) {
  const {
    groups=[],
  } = data || {}

  return {
    groups,
  }
}

export function serializeState(data) {
  return data
}

function cloneGroups(state) {
  return state.groups.map(item => ({...item}))
}
