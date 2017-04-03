import React, { Component } from 'react';
import * as components from '../components';

import './Row.css'

class Row extends Component {
  
  render() {
    return (
      <div className="columns">
        {
          this.props.row.components.map( (value) => {
            const Comp = components[value.componentName]
            return (
              <div className="column" key={value._id}>
                <Comp {...value} />
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default Row;
