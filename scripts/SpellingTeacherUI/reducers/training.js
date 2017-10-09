import {
  CHANGE,
  PICK,
  SAY,
  START,

  _RANDOM,
  _SPELLING,
  _TEST,
  _TRAINING,
  _USER,
  _WORD,

  _STARTED,
  _FINISHED,
} from '../constants'

export default (state = {}, action) => {
  const { type, data } = action

  switch (type) {
    case CHANGE + _USER + _SPELLING:
      return {
        ...state,
        userSpelling: data.string,
      }

    case START + _TRAINING:
      return {
        ...state,
        groupId: data.groupId,
        wordsCount: data.wordsCount,
        userSpelling: '',
      }

    case PICK + _RANDOM + _WORD:
      return {
        ...state,
        testingWord: data.testingWord,
      }

    case SAY + _TEST + _WORD + _STARTED:
      return {
        ...state,
        isSpeaking: true,
      }

    case SAY + _TEST + _WORD + _FINISHED:
      return {
        ...state,
        isSpeaking: false,
      }

    default:
      return state
  }
}

export function getInitState(data) {
  const {
    userSpelling = '',
    groupId = null,
    wordsCount = 0,
    testingWord = {},
  } = data || {}

  return {
    userSpelling,
    groupId,
    wordsCount,
    testingWord,
    isSpeaking: false,
  }
}

export function serializeState(data) {
  const _data = {...data}

  delete _data.isSpeaking

  return _data
}
