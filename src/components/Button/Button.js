import React, { Component } from 'react';

class Button extends Component {
  
  render() {
    return (
      <a className="button is-primary">{this.props.text}</a>
    );
  }
}

Button.expectedProps = {
    text: 'string'
}

export default Button;
