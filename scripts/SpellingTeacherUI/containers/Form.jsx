import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeFormField } from '../actions/form'
import { createGroup, updateGroup } from '../actions/dictionary'
import { openMainPage } from '../actions/internal'

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

  curryCancelEditing() {
    return () => {
      this.props.openMainPageAction()
    }
  }

  curryCreateGroup() {
    return () => {
      const { title, words } = this.props.form

      this.props.createGroupAction(title, words)
    }
  }

  curryUpdateGroup(id) {
    return () => {
      const { title, words } = this.props.form

      this.props.updateGroupAction(id, title, words)
    }
  }

  render() {
    return (
      <div>
        {this.renderGroupTitleField()}
        {this.renderGroupWordsField()}
        {this.renderControls()}
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

  renderControls() {
    return (
      <div className="controls">
        {this.renderCancelButton()}
        {this.renderCreateButton()}
        {this.renderUpdateButton()}
      </div>
    )
  }

  renderCancelButton() {
    const props = {
      onClick: this.curryCancelEditing(),
    }

    return <button {...props}>Cancel</button>
  }

  renderCreateButton() {
    const { id } = this.props.form

    if (id) {
      return null
    }

    const props = {
      disabled: this.isFormInvalid,
      onClick: this.curryCreateGroup(),
    }

    return <button {...props}>Create</button>
  }

  renderUpdateButton() {
    const { id } = this.props.form

    if (!id) {
      return null
    }

    const props = {
      disabled: this.isFormInvalid,
      onClick: this.curryUpdateGroup(id),
    }

    return <button {...props}>Update</button>
  }
}

export default connect(state => {
  const { internal, form } = state
  return {internal, form}
}, {
  changeFormFieldAction: changeFormField,
  createGroupAction: createGroup,
  updateGroupAction: updateGroup,
  openMainPageAction: openMainPage,
})(Form)
