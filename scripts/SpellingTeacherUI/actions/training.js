import {
  CHANGE,
  START,
  _SPELLING,
  _TRAINING,
  _USER,
} from '../constants'

export function changeUserSpelling(string) {
  return {
    type: CHANGE + _USER + _SPELLING,
    data: {string},
  }
}

export function startTraining(groupId) {
  return {
    type: START + _TRAINING,
    data: {groupId},
  }
}
