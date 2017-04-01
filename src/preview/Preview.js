import React, { Component } from 'react';
import * as components from '../components';

class Preview extends Component {
  render() {
    return (
      <div>
        {
          this.props.components.map( (value) => {
            const Comp = components[value.componentName]
            return <Comp key={value._id} {...value} />
          })
        }
      </div>
    );
  }
}

export default Preview;
