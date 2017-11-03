import { Record as imRecord, Map as imMap } from 'immutable'
import { createSelector } from 'reselect'
import { appName, SETTINGS_ELEMENT } from '../config'

// ACTIONS
const moduleName = 'settings'
const prefix = `${appName}/${moduleName}`

export const CHANGE_COLOR = `${prefix}/CHANGE_COLOR`



// REDUCER
const StateRecord = imRecord({
  colors: imMap({
    [SETTINGS_ELEMENT.PRIMARY_BUTTON]: {},
    [SETTINGS_ELEMENT.SECONDARY_BUTTON]: {},
    [SETTINGS_ELEMENT.TABLE_CELL_WARNING]: {},
    [SETTINGS_ELEMENT.TABLE_CELL_SUCCESS]: {},
  }),
  _conversion: 0,
})

export function getInitState(data={}) {
  const { colors, _conversion } = conversion1(data)

  return new StateRecord({
    colors: imMap(colors),
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
