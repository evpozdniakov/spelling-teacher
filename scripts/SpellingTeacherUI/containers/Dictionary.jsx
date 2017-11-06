import React, { Component } from 'react'
import { connect } from 'react-redux'
import { openGroupForm } from '../actions/internal'
import { deleteGroup, groupsSelector } from '../ducks/dictionary'
import { startTraining } from '../actions/training'
import Header from '../components/Header'
import '../style/Dictionary.less'

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
      const msg = 'Delete this group of words?'

      if (confirm(msg)) {
        this.props.deleteGroupAction(id)
      }
    }
  }

  render() {
    return (
      <div className="dictionary">
        {this.renderTitle()}
        {this.renderGroups()}
        {this.renderAddButton()}
      </div>
    )
  }

  renderTitle() {
    return (
      <Header>
        <h1>
          Dictionary
        </h1>
      </Header>
    )
  }

  renderAddButton() {
    return (
      <div className="controls">
        <button className="btn btn-primary" onClick={this.curryAddGroup()}>Add group of words</button>
      </div>
    )
  }

  renderGroups() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Group of words</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.props.groups.map(this.renderGroupRow.bind(this))}
        </tbody>
      </table>
    )
  }

  renderGroupRow(group) {
    const { id, title } = group

    return (
      <tr key={id}>
        <td>
          {title}
        </td>
        <td>
          <button className="btn btn-secondary" onClick={this.curryStartTraining(id)}>
            Start training
          </button>
          {' '}
          <button className="btn btn-outline-secondary" onClick={this.curryEditGroup(id)}>
            Edit
          </button>
          {' '}
          <button className="btn btn-outline-danger" onClick={this.curryDeleteGroup(id)}>
            Delete
          </button>
        </td>
      </tr>
    )
  }
}

export default connect(state => {
  return {
    internal: state.internal,
    groups: groupsSelector(state),
  }
}, {
  deleteGroupAction: deleteGroup,
  openGroupFormAction: openGroupForm,
  startTrainingAction: startTraining,
})(Dictionary)
