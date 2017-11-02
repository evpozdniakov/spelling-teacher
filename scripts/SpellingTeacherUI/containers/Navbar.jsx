import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../style/Navbar.less'

import {
  openGroupForm,
  openDictionary,
  openSettings,
} from '../actions/internal'

import {
  _DICTIONARY,
  _FORM,
  _TRAINING,
  _SETTINGS,
} from '../constants'

class Navbar extends Component {
  get trainingNavItem() {
    return {
      title: 'Training',
      mode: _TRAINING,
      disabled: true,
    }
  }

  get dictionaryNavItem() {
    return {
      title: 'Dictionary',
      mode: _DICTIONARY,
      action: this.props.openDictionaryAction
    }
  }

  get formNavItem() {
    return {
      title: 'Add words',
      mode: _FORM,
      action: this.props.openGroupFormAction,
    }
  }

  get settingsNavItem() {
    return {
      title: 'Settings',
      mode: _SETTINGS,
      action: this.props.openSettingsAction,
    }
  }

  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-light mb-4">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {this.renderNavItem(this.dictionaryNavItem)}
            {this.renderNavItem(this.formNavItem)}
            {this.renderNavItem(this.trainingNavItem)}
            {this.renderNavItem(this.settingsNavItem)}
          </ul>
        </div>
      </nav>
    )
  }

  renderNavItem(item) {
    const { mode } = this.props.internal
    const isActive = mode === item.mode
    const className = `nav-item ${isActive ? 'active' : ''}`
    const hasNoAction = !item.action

    const props = {
      className: `nav-link ${item.disabled ? 'disabled' : ''}`,
      href: '#',
      onClick: () => {
        if (isActive || hasNoAction) {
          return
        }

        item.action()
      }
    }

    return (
      <li className={className}>
        <a {...props}>
          {item.title}
        </a>
      </li>
    )
  }
}

export default connect(state => {
  const { internal } = state
  return {internal}
}, {
  openGroupFormAction: openGroupForm,
  openDictionaryAction: openDictionary,
  openSettingsAction: openSettings,
})(Navbar)
