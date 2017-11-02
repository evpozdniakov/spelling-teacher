import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navbar from './Navbar'
import Dictionary from './Dictionary'
import Form from './Form'
import Training from './Training'
import Settings from './Settings'
import { styleSettingsSelector } from '../ducks/settings'
import { changeElementColor } from '../utils'
import '../style/Main.less'

import {
  _DICTIONARY,
  _FORM,
  _TRAINING,
  _SETTINGS,
} from '../constants'

class Main extends Component {
  componentDidMount() {
    this.applyUserStyle()
  }

  get isFormMode() {
    const { mode } = this.props.internal

    return mode === _FORM
  }

  get isTrainingMode() {
    const { mode } = this.props.internal

    return mode === _TRAINING
  }

  get isDictionaryMode() {
    const { mode } = this.props.internal

    return mode === _DICTIONARY
  }

  get isSettingsMode() {
    const { mode } = this.props.internal

    return mode === _SETTINGS
  }

  applyUserStyle() {
    const { styleSettings } = this.props

    Object.keys(styleSettings).forEach(key => {
      changeElementColor(key, styleSettings[key])
    })
  }

  render() {
    return (
      <div className="container">
        <Navbar />
        {this.renderDictionary()}
        {this.renderForm()}
        {this.renderTrainingUI()}
        {this.renderSettings()}
      </div>
    )
  }

  renderDictionary() {
    if (!this.isDictionaryMode) {
      return null
    }

    return (
      <div className="main-menu">
        <Dictionary />
      </div>
    )
  }

  renderGroups() {
    return this.props.dictionary.groups.map(this.renderGroup.bind(this))
  }

  renderGroup(group) {
    const { id, title } = group

    return (
      <div className="group">
        <h3 className="title" onClick={this.curryUseGroup(id)}>
          {title}
        </h3>

        <div className="controls">
          <button onClick={this.curryEditGroup(id)}>
            Edit
          </button>
          <button onClick={this.curryDeleteGroup(id)}>
            Delete
          </button>
        </div>
      </div>
    )
  }

  renderForm() {
    if (!this.isFormMode) {
      return null
    }

    return <Form />
  }

  renderTrainingUI() {
    if (!this.isTrainingMode) {
      return null
    }

    return (
      <Training />
    )
  }

  renderSettings() {
    if (!this.isSettingsMode) {
      return null
    }

    return <Settings />
  }
}

export default connect(state => {
  const { internal, dictionary } = state
  return {
    internal,
    dictionary,
    styleSettings: styleSettingsSelector(state),
  }
}, {

})(Main)
