import React, { Component } from 'react'
import { connect } from 'react-redux'
import ColorPickerButton from '../components/ColorPickerButton'
import { SETTINGS_ELEMENT } from '../config'
import { changeColor, styleSettingsSelector } from '../ducks/settings'
import { changeElementColor } from '../utils'
import '../style/settings.less'

class Settings extends Component {
  componentWillReceiveProps(nextProps) {
    const nextSettings = nextProps.styleSettings
    const prevSettings = this.props.styleSettings

    Object.values(SETTINGS_ELEMENT).map(element => {
      const nextColor = nextSettings[element]
      const prevColor = prevSettings[element] || {}

      if (nextColor && nextColor.hex !== prevColor.hex) {
        changeElementColor(element, nextColor)
      }
    })
  }

  getElementColor(elementType) {
    return this.props.styleSettings[elementType]
  }

  render() {
    const currentColor = this.getElementColor(SETTINGS_ELEMENT.PRIMARY_BUTTON)

    console.log('--- currentColor', currentColor)

    return (
      <div className="settings">
        <table>
          <tbody>
            <tr>
              <td>
                <ColorPickerButton currentColor={currentColor} onColorChange={hex => this.props.changeColor(SETTINGS_ELEMENT.PRIMARY_BUTTON, hex)} />
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

export default connect(state => ({
  internal: state.internal,
  styleSettings: styleSettingsSelector(state),
}), {
  changeColor,
})(Settings)
