import React, { Component } from 'react'
import { SwatchesPicker } from 'react-color'
import PropTypes from 'prop-types'

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
    const style = {display: 'inline-block'}

    return (
      <div style={style}>
        {this.renderToggleButton()}
        {this.renderOverlay()}
        {this.renderSwatcherPicker()}
      </div>
    )
  }

  renderToggleButton() {
    const props = {
      onClick: this.curryToggleSwatches()
    }

    return (
      <button {...props}>
        {'pick color'}
      </button>
    )
  }

  renderOverlay() {
    if (!this.isSwatcherShown) {
      return null
    }

    const props = {
      style: {
        position: 'fixed',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
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

    const style = {position: 'absolute'}

    return (
      <div style={style}>
        <SwatchesPicker {...props} />
      </div>
    )
  }
}

export default ColorPickerButton
