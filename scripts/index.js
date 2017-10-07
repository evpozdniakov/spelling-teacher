import React from 'react'
import ReactDOM from 'react-dom'
import SpellingTeacherUI from './SpellingTeacherUI'
import md5 from 'md5'
import { makeStore, serializeAppState } from './SpellingTeacherUI/store'

var appStateMD5

const LOCAL_STORAGE = {
  APP_STATE: 'app-state',
}

const store = makeStore(readStateFromLocalStorage())
const app = <SpellingTeacherUI store={store} />
const ctnr = document.querySelector('#root')

ReactDOM.render(app, ctnr)

store.subscribe(saveStateInLocalStorage)

function saveStateInLocalStorage() {
  if (!localStorage) {
    return
  }

  const state = store.getState()

  storeAppStateLocally(state)
}

function storeAppStateLocally(state) {
  const prevAppStateMD5 = appStateMD5
  const appState = serializeAppState(state)
  const appStateJsonString = JSON.stringify(appState)

  appStateMD5 = md5(appStateJsonString)

  if (prevAppStateMD5 === appStateMD5) {
    return
  }

  localStorage.setItem(LOCAL_STORAGE.APP_STATE, JSON.stringify(appState))
}

function readStateFromLocalStorage() {
  if (!localStorage) {
    return {}
  }

  const appStateJsonString = localStorage.getItem(LOCAL_STORAGE.APP_STATE)

  if (!appStateJsonString) {
    return {}
  }

  return JSON.parse(appStateJsonString)
}
