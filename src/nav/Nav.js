import React, { Component } from 'react';

class Nav extends Component {
  
  render() {
    return (
      <nav className="nav">
        <div className="nav-right">
          <span className="nav-item">
            Rows
          </span>
          <span className="nav-item">
            Cols
          </span>
        </div>
      </nav>
    );
  }
}

export default Nav;
