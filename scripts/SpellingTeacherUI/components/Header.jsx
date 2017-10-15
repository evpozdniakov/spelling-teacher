import React, { Component } from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  children: PropTypes.any.isRequired,
}

class Header extends Component {
  static propTypes = propTypes

  render() {
    return (
      <header className="app-header mb-4">
        {this.props.children}
      </header>
    )
  }
}

export default Header
