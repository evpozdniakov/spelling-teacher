/* eslint global-require: "off", import/no-dynamic-require: "off" */

import { combineReducers } from 'redux'

export const reducerNames = [
  'dictionary',
  'form',
  'internal',
  'stats',
  'training',
]

export const combinedReducers = combineReducers(reducers())

function reducers() {
  return reducerNames.reduce((res, reducerName) => ({
    ...res,
    [reducerName]: require(`./${reducerName}`).default,
  }), {})
}
