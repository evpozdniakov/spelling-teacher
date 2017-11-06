import { Record as imRecord, Map as imMap } from 'immutable'
import { createSelector } from 'reselect'
import { appName, SETTINGS_ELEMENT } from '../config'

// ACTIONS
const moduleName = 'settings'
const prefix = `${appName}/${moduleName}`

export const CHANGE_COLOR = `${prefix}/CHANGE_COLOR`



// REDUCER
const defaultColors = {
  [SETTINGS_ELEMENT.NAV_TEXT]: {hex: '#000'},
  [SETTINGS_ELEMENT.NAV_BACKGROUND]: {hex: '#ddd'},
  [SETTINGS_ELEMENT.PRIMARY_BUTTON]: {hex: '#007bff'},
  [SETTINGS_ELEMENT.SECONDARY_BUTTON]: {hex: '#868e96'},
  [SETTINGS_ELEMENT.DANGER_BUTTON]: {hex: '#dc3545'},
  [SETTINGS_ELEMENT.TABLE_CELL_WARNING]: {hex: '#ffeeba'},
  [SETTINGS_ELEMENT.TABLE_CELL_SUCCESS]: {hex: '#c3e6cb'},
  [SETTINGS_ELEMENT.BODY_TEXT]: {hex: '#000'},
  [SETTINGS_ELEMENT.PROGRESS_BACKGROUND]: {hex: '#e9ecef'},
  [SETTINGS_ELEMENT.PROGRESS_COLOR]: {hex: '#007bff'},
  [SETTINGS_ELEMENT.TABLE_BORDER_COLOR]: {hex: '#e9ecef'},
}

const StateRecord = imRecord({
  colors: imMap(defaultColors),
  _conversion: 0,
})

export function getInitState(data={}) {
  const { colors, _conversion } = conversion1(data)

  return new StateRecord({
    colors: imMap({
      ...defaultColors,
      ...colors,
    }),
    _conversion,
  })
}

export function serializeState(state) {
  return state.toJSON()
}

export default (state={}, action) => {
  const { type, payload } = action

  switch (type) {
    case CHANGE_COLOR:
      return state
        .setIn(['colors', payload.element], payload.color)

    default:
      return state
  }
}

function conversion1(data) {
  if (data._conversion >= 1) {
    return data
  }

  return {
    colors: data,
    _conversion: 1,
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
export const styleSettingsSelector = createSelector(stateSelector, state => state.colors.toJSON())
