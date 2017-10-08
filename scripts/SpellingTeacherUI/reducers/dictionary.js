import md5 from 'md5'

import {
  SAVE,
  _GROUP,
} from '../constants'

export default (state = {}, action) => {
  const { type, data } = action

  switch (type) {
    case SAVE + _GROUP: {
      let { id, title, words } = data
      let groups = cloneGroups(state)

      if (id) {
        let group = groups.find(item => item.id === id)

        Object.assign(group, {title, words})
      }
      else {
        groups = groups.concat({
          id: md5(Math.random()),
          title,
          words,
        })
      }

      return {
        ...state,
        groups,
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
