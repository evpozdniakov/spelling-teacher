import { Record as imRecord, OrderedMap as imOrderedMap } from 'immutable'
import { createSelector } from 'reselect'
import { all, takeEvery, call, put } from 'redux-saga/effects'
import { getRandomHash } from 'lib/utils'
import { appName } from '../config'

// ACTIONS
const moduleName = 'dictionary'
const prefix = `${appName}/${moduleName}`

const CREATE_GROUP_REQUEST = `${prefix}/CREATE_GROUP_REQUEST`
const CREATE_GROUP = `${prefix}/CREATE_GROUP`
const DELETE_GROUP = `${prefix}/DELETE_GROUP`
const UPDATE_GROUP = `${prefix}/UPDATE_GROUP`

// REDUCER
const StateRecord = imRecord({
  groups: imOrderedMap()
})

const WordGroupRecord = imRecord({
  id: '',
  title: '',
  words: '',
})

export function getInitState(data={}) {
  const { groups=[] } = data
  const records = groups.map(group => [group.id, new WordGroupRecord(group)])

  return new StateRecord({
    groups: imOrderedMap(records),
  })
}

export function serializeState(state) {
  return {
    groups: state.groups.toArray().map(record => record.toJSON())
  }
}

export default (state={}, action) => {
  const { type, payload } = action

  switch (type) {
    case CREATE_GROUP:
    case UPDATE_GROUP: {
      let wordRecord = new WordGroupRecord(payload)

      return state
        .set('groups', state.groups.set(payload.id, wordRecord))
    }

    case DELETE_GROUP:
      return state
        .set('groups', state.groups.delete(payload.id))

    default:
      return state
  }
}

// ACTION CREATORS
export function createGroup(title, words) {
  return {
    type: CREATE_GROUP_REQUEST,
    payload: {title, words},
  }
}

export function deleteGroup(id) {
  return {
    type: DELETE_GROUP,
    payload: {id},
  }
}

export function updateGroup(id, title, words) {
  return {
    type: UPDATE_GROUP,
    payload: {id, title, words},
  }
}

// SAGAS
export function* saga() {
  yield all([
    takeEvery(CREATE_GROUP_REQUEST, createGroupSaga),
  ])
}

export function* createGroupSaga(action) {
  const id = yield call(getRandomHash)

  yield put({
    type: CREATE_GROUP,
    payload: {
      ...action.payload,
      id,
    }
  })
}


// SELECTOR
export const stateSelector = state => state[moduleName]
export const groupsSelector = createSelector(stateSelector, state => state.groups.toArray())

