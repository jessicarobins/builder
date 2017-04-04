import React, { Component } from 'react';
import cx from 'classnames'
import * as _ from 'lodash'

import * as components from '../components';
import './Preview.css'

class Preview extends Component {
  isSelected(c) {
    return c._id === _.get(this.props.selectedComponent, '_id')
  }
  
  select(c) {
    this.props.selectComponent(c)
  }
  
  render() {
    return (
      <div>
        {
          this.props.components.map( (value) => {
            const Comp = components[value.componentName]
            return (
              <div 
                onClick={() => this.select(value)}
                key={value._id}
                className={cx({ 
                  'item-container': true,
                  'selected-component': this.isSelected(value)
                })}>
                <Comp {...value} />
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default Preview;
