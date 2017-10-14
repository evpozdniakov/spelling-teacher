import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeFormField } from '../actions/form'
import { createGroup, updateGroup } from '../actions/dictionary'
import { openDictionary } from '../actions/internal'

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
      this.props.openDictionaryAction()
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
      <div className="entry-form">
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

    const input = <input className="form-control" {...props} />

    return this.renderFieldPair('Title', input)
  }

  renderGroupWordsField() {
    const { words } = this.props.form

    const props = {
      value: words,
      onChange: this.curryChangeField(FORM_FIELDS.WORDS),
    }

    const textarea = <textarea className="form-control words-textarea" {...props} />

    return this.renderFieldPair('Words (comma separated)', textarea)
  }

  renderFieldPair(title, field) {
    return (
      <div className="form-group row">
        <label className="col-form-label col-md-3">{title}</label>
        <div className="col-md-9">
          {field}
        </div>
      </div>
    )
  }

  renderControls() {
    return (
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-9">
          {this.renderCancelButton()}
          {this.renderCreateButton()}
          {this.renderUpdateButton()}
        </div>
      </div>
    )
  }

  renderCancelButton() {
    const props = {
      onClick: this.curryCancelEditing(),
    }

    return <button className="btn btn-outline-secondary mr-3" {...props}>Cancel</button>
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

    return <button className="btn btn-primary" {...props}>Create</button>
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

    return <button className="btn btn-primary" {...props}>Update</button>
  }
}

export default connect(state => {
  const { internal, form } = state
  return {internal, form}
}, {
  changeFormFieldAction: changeFormField,
  createGroupAction: createGroup,
  updateGroupAction: updateGroup,
  openDictionaryAction: openDictionary,
})(Form)
