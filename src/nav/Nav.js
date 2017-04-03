import React, { Component } from 'react';

class Nav extends Component {
  
  render() {
    return (
      <nav className="nav has-shadow">
      
        <div className="nav-center">
          <a className="nav-item" onClick={this.props.addRow}>
            Add Row
          </a>
        </div>
      </nav>
    );
  }
}

export default Nav;
