import {
  CHANGE,
  PICK,
  START,
  SAY,
  _RANDOM,
  _SPELLING,
  _TEST,
  _TRAINING,
  _USER,
  _WORD,
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

export function pickRandomWord() {
  return {
    type: PICK + _RANDOM + _WORD,
    data: {},
  }
}

export function sayTestWord() {
  return {
    type: SAY + _TEST + _WORD,
    data: {},
  }
}
