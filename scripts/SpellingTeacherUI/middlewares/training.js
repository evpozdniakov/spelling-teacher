import {
  _TRAINING,
  _STARTED,
  _FINISHED,
} from '../constants'

import { pickRandomWord, sayTestWord } from '../actions/training'

export function handlePickWord(store, next, action) {
  const trainingGroupId = store.getState().training.groupId
  const trainingGroup = store.getState().stats.groups.find(item => item.id === trainingGroupId)
  const trainingGroupWords = trainingGroup.words

  const minTriesValue = trainingGroupWords.reduce((res, word) => {
    if (res === null) {
      return word.tries
    }

    return Math.min(res, word.tries)
  }, null)

  const wordsWithMinTries = trainingGroupWords.filter(word => word.tries === minTriesValue)
  const randomIndex = Math.floor(Math.random() * wordsWithMinTries.length)
  const testingWord = wordsWithMinTries[randomIndex]

  next({
    ...action,
    data: {
      ...action.data,
      testingWord,
    },
  })
}

export function handleSayWord(store, next, action) {
  const { word } = store.getState().training.testingWord
  const { type } = action

  const onstart = () => {
    next({
      ...action,
      type: type + _STARTED,
    })
  }

  const onend = () => {
    next({
      ...action,
      type: type + _FINISHED,
    })
  }

  say(word, onstart, onend)
}

export function handleUserSpelling(store, next, action) {
  next(action)

  setTimeout(() => {
    const { mode } = store.getState().internal

    if (mode === _TRAINING) {
      store.dispatch(pickRandomWord())
      store.dispatch(sayTestWord())
    }
  }, 1000)
}

function say(text, onstart, onend) {
  if (!window.speechSynthesis) {
    throw new Error('speechSynthesis not supported')
  }

  const utterance = getBaseUtterance()

  Object.assign(utterance, {
    text,
    onstart,
    onend,
  })

  speechSynthesis.speak(utterance)
}

function getBaseUtterance() {
  const utterance = new SpeechSynthesisUtterance()
  const enUSVoice = speechSynthesis.getVoices().find(item => item.lang === 'en-US')

  Object.assign(utterance, {voice: enUSVoice})

  return utterance
}