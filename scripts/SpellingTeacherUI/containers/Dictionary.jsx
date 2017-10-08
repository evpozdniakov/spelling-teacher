import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addGroup, editGroup, deleteGroup } from '../actions/dictionary'

class Dictionary extends Component {
  curryUseGroup(id) {
    
  }

  curryAddGroup() {
    return () => {
      this.props.addGroupAction()
    }
  }

  curryEditGroup(id) {
    return () => {
      this.props.editGroupAction(id)
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
          <a href="javascript:;" onClick={this.curryUseGroup(id)}>{title}</a>
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
  addGroupAction: addGroup,
  editGroupAction: editGroup,
  deleteGroupAction: deleteGroup,
})(Dictionary)
