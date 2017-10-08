import {
  CREATE,
  DELETE,
  UPDATE,
  _GROUP,
} from '../constants'

export function createGroup(title, words) {
  return {
    type: CREATE + _GROUP,
    data: {title, words},
  }
}

export function deleteGroup(id) {
  return {
    type: DELETE + _GROUP,
    data: {id},
  }
}

export function updateGroup(id, title, words) {
  return {
    type: UPDATE + _GROUP,
    data: {id, title, words},
  }
}
