import React, { Component } from 'react'
import { SwatchesPicker } from 'react-color'
import PropTypes from 'prop-types'
import './style.less'

var propTypes

if (NODE_ENV === 'development') {
  propTypes = {
    onColorChange: PropTypes.func.isRequired,
    currentColor: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }
}

class ColorPickerButton extends Component {
  static propTypes = propTypes

  state = {
    isSwatcherShown: false
  }

  get isSwatcherShown() {
    return this.state.isSwatcherShown
  }

  curryToggleSwatches() {
    return () => {
      this.setState({isSwatcherShown: !this.isSwatcherShown})
    }
  }

  render() {
    return (
      <div className="color-picker-button-ui">
        {this.renderToggleButton()}
        {this.renderOverlay()}
        {this.renderSwatcherPicker()}
      </div>
    )
  }

  renderToggleButton() {
    const { hex='#ccc' } = this.props.currentColor || {};

    const props = {
      onClick: this.curryToggleSwatches(),
      style: {
        backgroundColor: hex
      }
    }

    return (
      <button {...props}>
        {'\u00a0'}
      </button>
    )
  }

  renderOverlay() {
    if (!this.isSwatcherShown) {
      return null
    }

    const props = {
      className: 'overlay',
      onClick: this.curryToggleSwatches()
    }

    return <div {...props} />
  }

  renderSwatcherPicker() {
    if (!this.isSwatcherShown) {
      return null
    }

    const { currentColor, onColorChange } = this.props
    const { hex } = currentColor || {}
    const color = hex || currentColor

    const props = {
      color,
      onChange: onColorChange,
    }

    return (
      <div className="swatches">
        <SwatchesPicker {...props} />
      </div>
    )
  }
}

export default ColorPickerButton
