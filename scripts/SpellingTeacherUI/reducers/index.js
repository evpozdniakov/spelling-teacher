/* eslint global-require: "off", import/no-dynamic-require: "off" */

import { combineReducers } from 'redux'
import settings from '../ducks/settings'

export const reducerNames = [
  'dictionary',
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
      settings,
    }), {})
}
