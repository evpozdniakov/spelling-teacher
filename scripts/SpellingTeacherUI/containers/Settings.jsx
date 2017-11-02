import React, { Component } from 'react'
import { connect } from 'react-redux'
import ColorPickerButton from '../components/ColorPickerButton'
import { SETTINGS_ELEMENT } from '../config'
import { changeColor } from '../ducks/settings'
import { changeElementColor } from '../utils'
import '../style/settings.less'

class Settings extends Component {
  componentWillReceiveProps(nextProps) {
    const nextSettings = nextProps.settings
    const prevSettings = this.props.settings

    Object.values(SETTINGS_ELEMENT).map(element => {
      const nextColor = nextSettings[element]
      const prevColor = prevSettings[element] || {}

      if (nextColor && nextColor.hex !== prevColor.hex) {
        changeElementColor(element, nextColor)
      }
    })
  }

  render() {
    return (
      <div className="settings">
        <table>
          <tbody>
            <tr>
              <td>
                <ColorPickerButton onColorChange={hex => this.props.changeColor(SETTINGS_ELEMENT.PRIMARY_BUTTON, hex)} />
              </td>
              <td>
                Primary button
              </td>
              <td>
                <button className="btn btn-primary">Primary</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default connect(state => {
  const { internal, settings } = state
  return {internal, settings}
}, {
  changeColor,
})(Settings)
