import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../style/Training.less'
import { changeUserSpelling } from '../actions/training'
import { openMainPage } from '../actions/internal'

// import {
//   _FORM,
//   _TRAINING,
// } from '../constants'

class Training extends Component {
  curryChangeWord() {
    return ev => {
      const string = ev.target.value

      this.props.changeUserSpellingAction(string)
    }
  }

  curryCheckWord() {
    return ev => {
      if (ev.keyCode !== 13) {
        return
      }

      const string = ev.target.value.trim()

      if (!string) {
        return
      }

      console.log('--- check string:', string)
    }
  }

  curryBackButtonClick() {
    return () => {
      this.props.openMainPageAction()
    }
  }

  render() {
    return (
      <div className="training-ui">
        {this.renderBackButton()}
        {this.renderInputField()}
      </div>
    )
  }

  renderBackButton() {
    const props = {
      onClick: this.curryBackButtonClick()
    }

    return (
      <div className="controls">
        <button {...props}>⇦</button>
      </div>
    )
  }

  renderInputField() {
    const { userSpelling } = this.props.training

    const props = {
      value: userSpelling,
      onChange: this.curryChangeWord(),
      onKeyPress: this.curryCheckWord(),
    }

    return (
      <div className="input-field-box">
        <input {...props} />
      </div>
    )
  }
}

export default connect(state => {
  const { dictionary, training } = state
  return {dictionary, training}
}, {
  changeUserSpellingAction: changeUserSpelling,
  openMainPageAction: openMainPage,
})(Training)
