import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../style/Training.less'
import { openMainPage } from '../actions/internal'
import {
  changeUserSpelling,
  registerRightSpelling,
  registerWrongSpelling,
  sayTestWord,
} from '../actions/training'

// import {
//   _FORM,
//   _TRAINING,
// } from '../constants'

class Training extends Component {
  get group() {
    const { groupId } = this.props.training
    const { groups } = this.props.dictionary
    const group = groups.find(item => item.id === groupId)

    return group
  }

  get testingWord() {
    return this.props.training.testingWord.word
  }

  get testingWordId() {
    return this.props.training.testingWord.id
  }

  curryChangeWord() {
    return ev => {
      const string = ev.target.value

      this.props.changeUserSpellingAction(string)
    }
  }

  curryCheckSpelling() {
    return ev => {
      if (ev.charCode !== 13) {
        return
      }

      const spelling = ev.target.value.trim()

      if (!spelling) {
        return
      }

      const { groupId } = this.props.training

      if (spelling === this.testingWord) {
        this.props.registerRightSpellingAction(groupId, this.testingWordId)
      }
      else {
        this.props.registerWrongSpellingAction(groupId, this.testingWordId)
      }
    }
  }

  curryBackButtonClick() {
    return () => {
      this.props.openMainPageAction()
    }
  }

  currySayAgain() {
    return () => {
      this.props.sayTestWordAction()
    }
  }

  render() {
    return (
      <div className="training-ui">
        {this.renderBackButton()}
        {this.renderTitle()}
        {this.renderDictionaryInfo()}
        {this.renderSayAgainButton()}
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

  renderTitle() {
    return <h1>Training</h1>
  }

  renderDictionaryInfo() {
    const { title } = this.group
    const { wordsCount } = this.props.training

    return (
      <div className="dictionary-info">
        <div className="name">Group: {title}</div>
        <div className="words-count">Words: {wordsCount}</div>
      </div>
    )
  }

  renderSayAgainButton() {
    return (
      <div className="controls">
        <button onClick={this.currySayAgain()}>Say again</button>
      </div>
    )
  }

  renderInputField() {
    const { userSpelling } = this.props.training

    const props = {
      value: userSpelling,
      onChange: this.curryChangeWord(),
      onKeyPress: this.curryCheckSpelling(),
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
  registerRightSpellingAction: registerRightSpelling,
  registerWrongSpellingAction: registerWrongSpelling,
  sayTestWordAction: sayTestWord,
})(Training)
