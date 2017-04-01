import React, { Component } from 'react';
import * as _ from 'lodash';

import * as components from '../components';

class Sidebar extends Component {
  
  constructor(props) {
    super(props);

    this.state = { 
      buttonText: 'default'
    };
  }
  
  fields(component) {
    return _.map(component.expectedProps, (p, key) => {
      return (
        <label key={key}>
          {key}
          <input type="text" value={this.state[key]} onChange={(event) => this.handleChange(event, key)} />
        </label>
      )
    })
  }
  
  button() {
    return (
      <div>
        <components.Button text={this.state.text} />
        {
          _.map(components, c => this.fields(c))
        }
      </div>
    )
  }
  
  handleChange(event, key) {
    this.setState({[key]: event.target.value});
  }
  
  render() {
    return (
      <div>{this.button()}</div>
    );
  }
}

export default Sidebar;
