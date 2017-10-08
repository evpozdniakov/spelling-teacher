import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editGroup } from '../actions/dictionary'

class Dictionary extends Component {
  curryUseGroup() {}

  curryEditGroup(id) {
    return () => {
      this.props.editGroupAction(id)
    }
  }

  curryDeleteGroup() {}

  render() {
    return (
      <div className="dictionary">
        {this.renderGroups()}
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
        <h3 className="title" onClick={this.curryUseGroup(id)}>
          {title}
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
  editGroupAction: editGroup,
})(Dictionary)
