import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeFormField } from '../actions/form'
import { saveGroup } from '../actions/dictionary'

import '../style/Form.less'

import {
  FORM_FIELDS,
} from '../constants'

class Form extends Component {
  get isFormInvalid() {
    const {
      title='',
      words='',
    } = this.props.form

    return !title.trim() || !words.trim()
  }

  curryChangeField(name) {
    return ev => {
      this.props.changeFormFieldAction(name, ev.target.value)
    }
  }

  currySaveForm() {
    return () => {
      const { title, words } = this.props.form

      this.props.saveGroupAction(title, words)
    }
  }

  render() {
    return (
      <div>
        {this.renderGroupTitleField()}
        {this.renderGroupWordsField()}
        {this.renderSaveButton()}
      </div>
    )
  }

  renderGroupTitleField() {
    const { title } = this.props.form

    const props = {
      value: title,
      onChange: this.curryChangeField(FORM_FIELDS.TITLE),
    }

    const input = <input {...props} />

    return this.renderFieldPair('Title', input)
  }

  renderGroupWordsField() {
    const { words } = this.props.form

    const props = {
      value: words,
      onChange: this.curryChangeField(FORM_FIELDS.WORDS),
    }

    const textarea = <textarea {...props} />

    return this.renderFieldPair('Words (comma separated)', textarea)
  }

  renderFieldPair(title, field) {
    return (
      <div className="field-pair">
        <label>{title}</label>
        <div className="field">{field}</div>
      </div>
    )
  }

  renderSaveButton() {
    const props = {
      disabled: this.isFormInvalid,
      onClick: this.currySaveForm(),
    }

    return (
      <div>
        <button {...props}>Save</button>
      </div>
    )
  }
}

export default connect(state => {
  const { internal, form } = state
  return {internal, form}
}, {
  changeFormFieldAction: changeFormField,
  saveGroupAction: saveGroup,
})(Form)
