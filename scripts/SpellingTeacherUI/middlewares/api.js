import {
  EDIT,
  SAVE,
  _GROUP,
} from '../constants'

import { handleEditGroup, handleSaveGroup } from './dictionary'

export default store => next => action => {
  const { type } = action

  switch (type) {
    case EDIT + _GROUP:
      handleEditGroup(store, next, action)
      break

    case SAVE + _GROUP:
      handleSaveGroup(store, next, action)
      break

    default:
      next(action)
  }
}
