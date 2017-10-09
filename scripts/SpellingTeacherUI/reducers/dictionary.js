import { getRandomHash } from 'lib/utils'

import {
  CREATE,
  DELETE,
  UPDATE,
  _GROUP,
} from '../constants'

export default (state = {}, action) => {
  const { type, data } = action

  switch (type) {
    case CREATE + _GROUP: {
      let newGroup = {
        id: getRandomHash(),
        title: data.title,
        words: data.words,
      }

      return {
        ...state,
        groups: cloneGroups(state).concat(newGroup)
      }
    }

    case UPDATE + _GROUP: {
      let { id, title, words } = data
      let clonedGroups = cloneGroups(state)
      let currentGroup = clonedGroups.find(item => item.id === id)

      Object.assign(currentGroup, {title, words})

      return {
        ...state,
        groups: clonedGroups,
      }
    }

    case DELETE + _GROUP: {
      let { id } = data
      let clonedGroups = cloneGroups(state)

      return {
        ...state,
        groups: clonedGroups.filter(item => item.id !== id),
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
