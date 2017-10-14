import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../style/Training.less'
import {
  changeUserSpelling,
  checkUserSpelling,
  sayTestWord,
} from '../actions/training'

import {
  CHAR_CODE,
} from '../constants'

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

  curryChangeText() {
    return ev => {
      const string = ev.target.value.trim()

      this.props.changeUserSpellingAction(string)
    }
  }

  curryKeyPress() {
    return ev => {
      if (![CHAR_CODE.ENTER, CHAR_CODE.SPACE].includes(ev.charCode)) {
        return
      }

      const spelling = ev.target.value.trim()

      if (!spelling) {
        this.props.sayTestWordAction()
        return
      }
      else if (ev.charCode === CHAR_CODE.ENTER) {
        this.props.checkUserSpellingAction(spelling)
      }
    }
  }

  currySayAgainButtonClick() {
    return () => {
      this.props.sayTestWordAction()
      this.refs.inputField.focus()
    }
  }

  render() {
    return (
      <div className="training-ui">
        {this.renderTitle()}
        {this.renderDictionaryInfo()}
        {this.renderSayAgainButton()}
        {this.renderInputField()}
        {this.renderSpellingHistory()}
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
        <button onClick={this.currySayAgainButtonClick()}>Say again</button>
      </div>
    )
  }

  renderInputField() {
    const { userSpelling } = this.props.training

    const props = {
      ref: 'inputField',
      spellCheck: false,
      value: userSpelling,
      onChange: this.curryChangeText(),
      onKeyPress: this.curryKeyPress(),
    }

    return (
      <div className="input-field-box">
        <input {...props} />
      </div>
    )
  }

  renderSpellingHistory() {
    const { history } = this.props.training

    if (!history.length) {
      return null
    }

    return (
      <div className="spelling-history">
        <ol>
          {history.map(this.renderHistoryItem.bind(this))}
        </ol>
      </div>
    )
  }

  renderHistoryItem(item, index) {
    const className = item.isRight ? 'is-right' : 'is-wrong'

    return (
      <li key={index} className={className}>
        <span className="user-spelling">{item.spelling}</span>
        <span className="icon">{item.isRight ? '✔' : ''}</span>
        <span className="right-spelling">{item.isRight ? '' : item.rightSpelling}</span>
      </li>
    )
  }
}

export default connect(state => {
  const { dictionary, training } = state
  return {dictionary, training}
}, {
  changeUserSpellingAction: changeUserSpelling,
  sayTestWordAction: sayTestWord,
  checkUserSpellingAction: checkUserSpelling,
})(Training)
