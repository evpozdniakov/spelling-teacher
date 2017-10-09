import {
  CHANGE,
  PICK,
  REGISTER,
  START,
  SAY,
  _RANDOM,
  _RIGHT,
  _SPELLING,
  _TEST,
  _TRAINING,
  _USER,
  _WORD,
  _WRONG,
} from '../constants'

export function changeUserSpelling(string) {
  return {
    type: CHANGE + _USER + _SPELLING,
    data: {string},
  }
}

export function registerRightSpelling(groupId, wordId) {
  return {
    type: REGISTER + _RIGHT + _SPELLING,
    data: {groupId, wordId},
  }
}

export function registerWrongSpelling(groupId, wordId) {
  return {
    type: REGISTER + _WRONG + _SPELLING,
    data: {groupId, wordId},
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
