import {
  CHECK,
  CHANGE,
  PICK,
  REGISTER,
  SAY,
  START,

  _RANDOM,
  _RIGHT,
  _SPELLING,
  _TEST,
  _TRAINING,
  _USER,
  _WORD,
  _WRONG,

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
        history: [],
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

    case CHECK + _USER + _SPELLING:
      return {
        ...state,
        history: state.history.concat({spelling: data.spelling}),
        userSpelling: '',
      }

    case REGISTER + _WRONG + _SPELLING: {
      let { history } = state
      let lastItem = history[history.length - 1]
      let { word } = state.testingWord

      lastItem.isRight = false
      lastItem.rightSpelling = word

      return {
        ...state,
        history
      }
    }

    case REGISTER + _RIGHT + _SPELLING: {
      let { history } = state
      let lastItem = history[history.length - 1]

      lastItem.isRight = true

      return {
        ...state,
        history
      }
    }

    default:
      return state
  }
}

export function getInitState(data) {
  const {
    groupId = null,
    history = [],
    // isSpeaking skipped
    testingWord = {},
    userSpelling = '',
    wordsCount = 0,
  } = data || {}

  return {
    groupId,
    history,
    isSpeaking: false,
    testingWord,
    userSpelling,
    wordsCount,
  }
}

export function serializeState(data) {
  const _data = {...data}

  delete _data.isSpeaking

  return _data
}
