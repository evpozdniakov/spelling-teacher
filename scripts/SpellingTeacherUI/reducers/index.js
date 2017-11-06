/* eslint global-require: "off", import/no-dynamic-require: "off" */

import { combineReducers } from 'redux'
import settings from '../ducks/settings'
import dictionary from '../ducks/dictionary'

export const reducerNames = [
  'form',
  'internal',
  'stats',
  'training',
]

export const combinedReducers = combineReducers(reducers())

function reducers() {
  return reducerNames
    .filter(name => name !== 'settings')
    .reduce((res, reducerName) => ({
      ...res,
      [reducerName]: require(`./${reducerName}`).default,
      dictionary,
      settings,
    }), {})
}
