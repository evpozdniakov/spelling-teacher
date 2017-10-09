import {
  CREATE,
  OPEN,
  PICK,
  SAY,
  START,
  UPDATE,
  _FORM,
  _GROUP,
  _RANDOM,
  _TEST,
  _TRAINING,
  _WORD,
} from '../constants'

import { handleEditGroup } from './dictionary'
import { handleStartTraining } from './stats'
import { handlePickWord, handleSayWord } from './training'
import { openMainPage } from '../actions/internal'

export default store => next => action => {
  const { type } = action

  switch (type) {
    case OPEN + _GROUP + _FORM:
      handleEditGroup(store, next, action)
      break

    case START + _TRAINING:
      handleStartTraining(store, next, action)
      break

    case CREATE + _GROUP:
    case UPDATE + _GROUP:
      next(action)
      store.dispatch(openMainPage())
      break

    case PICK + _RANDOM + _WORD:
      handlePickWord(store, next, action)
      break

    case SAY + _TEST + _WORD:
      handleSayWord(store, next, action)
      break

    default:
      next(action)
  }
}
