import {
  ADD,
  DELETE,
  EDIT,
  SAVE,
  _GROUP,
} from '../constants'

export function deleteGroup(id) {
  return {
    type: DELETE + _GROUP,
    data: {id},
  }
}

export function saveGroup(title, words) {
  return {
    type: SAVE + _GROUP,
    data: {title, words},
  }
}

export function editGroup(id) {
  return {
    type: EDIT + _GROUP,
    data: {id},
  }
}

export function addGroup() {
  return {
    type: ADD + _GROUP,
    data: {},
  }
}
