import {
  CREATE,
  OPEN,
  START,
  UPDATE,
  _FORM,
  _GROUP,
  _TRAINING,
} from '../constants'

import { handleEditGroup } from './dictionary'
import { handleStartTraining } from './stats'
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

    default:
      next(action)
  }
}
