import { Record as imRecord } from 'immutable'
import { createSelector } from 'reselect'
import { appName, SETTINGS_ELEMENT } from '../config'

// ACTIONS
const moduleName = 'settings'
const prefix = `${appName}/${moduleName}`

export const CHANGE_COLOR = `${prefix}/CHANGE_COLOR`



// REDUCER
const StateRecord = imRecord({
  [SETTINGS_ELEMENT.PRIMARY_BUTTON]: {},
})

export function getInitState(data={}) {
  return new StateRecord(data)
}

export function serializeState(state) {
  return state.toJSON()
}

export default (state={}, action) => {
  const { type, payload } = action

  switch (type) {
    case CHANGE_COLOR:
      return state
        .set(payload.element, payload.color)

    default:
      return state
  }
}



// ACTION CREATORS

export function changeColor(element, color) {
  return {
    type: CHANGE_COLOR,
    payload: {element, color}
  }
}


// SELECTOR

export const stateSelector = state => state[moduleName]
export const styleSettingsSelector = createSelector(stateSelector, state => state.toJSON())
