import React, { Component } from 'react'
import { connect } from 'react-redux'
import { openGroupForm } from '../actions/internal'
import { deleteGroup } from '../actions/dictionary'
import { startTraining } from '../actions/training'

class Dictionary extends Component {
  curryStartTraining(id) {
    return () => {
      this.props.startTrainingAction(id)
    }
  }

  curryAddGroup() {
    return () => {
      this.props.openGroupFormAction()
    }
  }

  curryEditGroup(id) {
    return () => {
      this.props.openGroupFormAction(id)
    }
  }

  curryDeleteGroup(id) {
    return () => {
      this.props.deleteGroupAction(id)
    }
  }

  render() {
    return (
      <div className="dictionary">
        {this.renderTitle()}
        {this.renderAddButton()}
        {this.renderGroups()}
      </div>
    )
  }

  renderTitle() {
    return <h1>Dictionary</h1>
  }

  renderAddButton() {
    return (
      <div className="controls">
        <button onClick={this.curryAddGroup()}>Add words</button>
      </div>
    )
  }

  renderGroups() {
    return this.props.dictionary.groups.map(this.renderGroup.bind(this))
  }

  renderGroup(group) {
    const { id, title } = group

    return (
      <div key={id} className="group">
        <h3 className="title">
          <a href="javascript:;" onClick={this.curryStartTraining(id)}>{title}</a>
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
}

export default connect(state => {
  const { internal, dictionary } = state
  return {internal, dictionary}
}, {
  deleteGroupAction: deleteGroup,
  openGroupFormAction: openGroupForm,
  startTrainingAction: startTraining,
})(Dictionary)
