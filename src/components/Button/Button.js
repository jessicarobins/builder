import React, { Component, PropTypes } from 'react';
import cx from 'classnames'

class Button extends Component {
  
  render() {
    return (
      <a className={cx({ 
        [this.props.color]: true,
        'button': true
      })}>{this.props.text}</a>
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
  text: {
    type: 'string'
  },
  color: {
    type: 'radio',
    options: [{
      label: 'primary',
      value: 'is-primary'
    }, {
      label: 'info',
      value: 'is-info'
    }, {
      label: 'success',
      value: 'is-success'
    }, {
      label: 'warning',
      value: 'is-warning'
    }]
  }
}

export default Button;
