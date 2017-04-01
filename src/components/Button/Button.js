import React, { Component, PropTypes } from 'react';

class Button extends Component {
  
  render() {
    return (
      <a className="button is-primary">{this.props.text}</a>
    );
  }
}

Button.defaultProps = {
  text: 'Default'
}

Button.propTypes = {
  text: PropTypes.string.isRequired
};

Button.expectedProps = {
  text: 'string'
}

export default Button;
