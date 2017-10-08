import {
  SAVE,
  EDIT,
  _GROUP,
} from '../constants'

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
