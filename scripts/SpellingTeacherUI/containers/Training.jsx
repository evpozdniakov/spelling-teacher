import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from '../components/Header'
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
  componentDidUpdate(prevProps) {
    const { isSpeaking } = this.props.training
    const { isSpeaking: isSpeakingPrev } = prevProps.training

    if (isSpeakingPrev === true) {
      if (isSpeaking === false) {
        this.refs.inputField.focus()
      }
    }
  }

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

  get progressPercent() {
    const { history, wordsCount } = this.props.training
    const wordsChecked = history.length

    if (wordsChecked >= wordsCount) {
      return 100
    }

    return Math.round(wordsChecked / wordsCount * 100)

  }

  curryChangeText() {
    return ev => {
      const string = ev.target.value

      if (string.trim() === '') {
        this.props.changeUserSpellingAction('')
        return
      }

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
    }
  }

  curryCheckSpellingButtonClick() {
    return () => {
      const spelling = this.refs.inputField.value.trim()

      if (!spelling) {
        this.props.sayTestWordAction()
        return
      }

      this.props.checkUserSpellingAction(spelling)
    }
  }

  render() {
    return (
      <div className="training-ui">
        {this.renderTitle()}
        {this.renderInputGroupAndProgressBar()}
        {this.renderSpellingHistory()}
      </div>
    )
  }

  renderTitle() {
    const { title } = this.group
    const pageTitle = `${title}: training`

    return (
      <Header>
        <h1>{pageTitle}</h1>
      </Header>
    )
  }

  renderInputGroupAndProgressBar() {
    return (
      <div className="row">
        <div className="col-md-8 col-lg-6">{this.renderInputGroup()}</div>
        <div className="col-md-4 col-lg-6">{this.renderProgressBar()}</div>
      </div>
    )
  }

  renderProgressBar() {
    const progress = this.progressPercent
    const width = `${progress}%`
    const style = {width}
    const label = progress > 10 ? `${progress}%` : ''

    return (
      <div className="progress">
        <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={style}>
          {label}
        </div>
      </div>
    )
  }

  renderInputGroup() {
    return (
      <div className="input-group">
        <span className="input-group-btn">
          {this.renderSayAgainButton()}
        </span>
        {this.renderInputField()}
        <span className="input-group-btn">
          {this.renderCheckSpellingButton()}
        </span>
      </div>
    )
  }

  renderSayAgainButton() {
    const props = {
      onClick: this.currySayAgainButtonClick(),
      className: 'btn btn-secondary',
      type: 'button',
    }

    return (
      <button {...props}>
        Say again
      </button>
    )
  }

  renderCheckSpellingButton() {
    const props = {
      onClick: this.curryCheckSpellingButtonClick(),
      className: 'btn btn-primary',
      type: 'button',
    }

    return (
      <button {...props}>
        Check spelling
      </button>
    )
  }

  renderInputField() {
    const { userSpelling, isSpeaking } = this.props.training

    const props = {
      className: 'form-control',
      onChange: this.curryChangeText(),
      onKeyPress: this.curryKeyPress(),
      ref: 'inputField',
      spellCheck: false,
      type: 'text',
      value: userSpelling,
      disabled: isSpeaking,
    }

    return <input {...props} />
  }

  renderSpellingHistory() {
    const { history } = this.props.training

    if (!history.length) {
      return null
    }

    return (
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Your spelling</th>
            <th>Dictionary</th>
            <th>Stats</th>
          </tr>
        </thead>
        <tbody>
          {history.concat().reverse().map(this.renderHistoryItemRow.bind(this))}
        </tbody>
      </table>
    )
  }

  renderHistoryItemRow(item, index) {
    const { spelling, isRight, rightSpelling, tries, fails } = item
    const className = isRight ? 'table-success' : 'table-warning'

    return (
      <tr key={index} className={className}>
        <td>{spelling}</td>
        <td>{rightSpelling}</td>
        <td>{this.renderWordStats(tries, fails)}</td>
      </tr>
    )
  }

  renderWordStats(tries, fails) {
    const percent = Math.round(((tries - fails) / tries) * 100)

    return (
      <div>
        {tries - fails}
        {' / '}
        {tries}
        {' '}
        ({percent}%)
      </div>
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
