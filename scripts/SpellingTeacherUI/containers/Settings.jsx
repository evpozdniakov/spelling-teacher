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
    return (
      <div className="settings">
        <table>
          <tbody>
            {[{
              type: SETTINGS_ELEMENT.PRIMARY_BUTTON,
              title: 'Primary button',
              children: <button className="btn btn-primary">Primary</button>,
            }, {
              type: SETTINGS_ELEMENT.SECONDARY_BUTTON,
              title: 'Secondary button',
              children: [
                <button key="secondary" className="btn btn-secondary">Secondary</button>,
                <button key="secondary-outline" className="btn btn-outline-secondary">Outline</button>
              ],
            }, {
              type: SETTINGS_ELEMENT.DANGER_BUTTON,
              title: 'Danger button',
              children: <button className="btn btn-outline-danger">Danger</button>,
            }, {
              type: SETTINGS_ELEMENT.TABLE_CELL_WARNING,
              title: 'Warning cell',
              children: <table className="table"><tbody><tr className="table-warning"><td>Warning</td></tr></tbody></table>,
            }, {
              type: SETTINGS_ELEMENT.TABLE_CELL_SUCCESS,
              title: 'Success cell',
              children: <table className="table"><tbody><tr className="table-success"><td>Success</td></tr></tbody></table>,
            }, {
              type: SETTINGS_ELEMENT.TEXT_COLOR,
              title: 'Text',
              children: <div>Lorem ipsum</div>,
            }].map(this.renderRow.bind(this))}
          </tbody>
        </table>
      </div>
    )
  }

  renderRow({type, title, children}, index) {
    return (
      <tr key={index} className="settings-entry">
        <td>
          <ColorPickerButton
            currentColor={this.getElementColor(type)}
            onColorChange={hex => this.props.changeColor(type, hex)} />
        </td>
        <td>
          {title}
        </td>
        <td>
          {children}
        </td>
      </tr>
    )
  }
}

export default connect(state => ({
  internal: state.internal,
  styleSettings: styleSettingsSelector(state),
}), {
  changeColor,
})(Settings)
