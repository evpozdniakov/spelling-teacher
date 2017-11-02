import React, { Component } from 'react'
import { SwatchesPicker } from 'react-color'

class ColorPickerButton extends Component {
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

    const props = {
      color: '#d32f2f',
      onChange: color => {
        this.props.onColorChange(color)
      },
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
