import {
  CREATE,
  UPDATE,
  _GROUP,
  _STATS,
} from '../constants'

export function createGroupStats(group) {
  return {
    type: CREATE + _GROUP + _STATS,
    data: {group},
  }
}

export function updateGroupStats(group) {
  return {
    type: UPDATE + _GROUP + _STATS,
    data: {group},
  }
}
