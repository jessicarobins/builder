import React, { Component } from 'react';
import * as _ from 'lodash';

import * as components from '../components';

class Sidebar extends Component {
  
  fields(component) {
    return _.map(component.expectedProps, (p, key) => {
      return (
        <div>
          <label key={key}>
            {key}
            <input
              type="text"
              ref="text" />
          </label>
          <button onClick={() => this.onAddComponentClick(component.name)}>Add</button>
        </div>
      )
    })
  }
  
  onAddComponentClick(key) {
    this.props.addComponent({
      componentName: key,
      text: this.refs.text.value,
      _id: Math.random()
    })
    
    this.refs.text.value = ''
  }
  
  render() {
    return (
      <div>
        {
          _.map(components, c => this.fields(c))
        }
      </div>
    );
  }
}

export default Sidebar;
