import md5 from 'md5'

import {
  DELETE,
  SAVE,
  _GROUP,
} from '../constants'

export default (state = {}, action) => {
  const { type, data } = action

  switch (type) {
    case DELETE + _GROUP: {
      let { id } = data
      let clonedGroups = cloneGroups(state)

      return {
        ...state,
        groups: clonedGroups.filter(item => item.id !== id),
      }
    }

    case SAVE + _GROUP: {
      let { id, title, words } = data
      let clonedGroups = cloneGroups(state)

      if (id) {
        let currentGroup = clonedGroups.find(item => item.id === id)

        Object.assign(currentGroup, {title, words})
      }
      else {
        let newGroup = {
          id: md5(new Date()),
          title,
          words,
        }

        clonedGroups = clonedGroups.concat(newGroup)
      }

      return {
        ...state,
        groups: clonedGroups,
      }
    }

    default:
      return state
  }
}

export function getInitState(data) {
  const {
    groups = [],
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
