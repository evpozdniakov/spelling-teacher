import { combineReducers } from 'redux'
import dictionary from './dictionary'
import form from './form'
import internal from './internal'

export default combineReducers({
  dictionary,
  form,
  internal,
})
