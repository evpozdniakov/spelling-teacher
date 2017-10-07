import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../style/Form.less'

import {
  _FORM,
  _TRAINING,
} from '../constants'

class Main extends Component {
  get isFormMode() {
    const { mode } = this.props.internal

    return mode === _FORM
  }

  get isTrainingMode() {
    const { mode } = this.props.internal

    return mode === _TRAINING
  }

  render() {
    return (
      <div>
        {this.renderForm()}
        {this.renderTrainingUI()}
      </div>
    )
  }

  renderForm() {
    if (!this.isFormMode) {
      return null
    }

    return (
      <div>
        <textarea className="enter-test-words"></textarea>
      </div>
    )
  }

  renderTrainingUI() {
    if (!this.isTrainingMode) {
      return null
    }

    return (
      <div>_TRAINING</div>
    )
  }
}

export default connect(state => {
  const { internal } = state
  return {internal}
}, {

})(Main)
