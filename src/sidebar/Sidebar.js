import React, { Component } from 'react';
import * as _ from 'lodash';

import * as components from '../components';

class Sidebar extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      selected: null
    }
  }
  
  fields() {
    return (
      <div>
        {
          _.map(this.state.selected.expectedProps, (p, key) => {
            return (
              <div key={key}>
                <label>
                  {key}
                  <input
                    type="text"
                    ref={key} />
                </label>
              </div>
            )
          })
        }
        <button onClick={() => this.onAddComponentClick(this.state.selected.name)}>Add</button>
      </div>
    )
  }
  
  componentNames() {
    return _.map(components, c => {
      return (
        <div key={c.name}>
          <a onClick={() => this.setSelectedComponent(c)}>{c.name}</a>
        </div>
      )
    })
  }
  
  setSelectedComponent(c) {
    this.setState({selected: c})
  }
  
  onAddComponentClick(key) {
    let props = {
      componentName: key,
      _id: Math.random()
    }
    
    let refs = _.map(this.refs, (value, key) => {
      console.log('value: ', value)
      console.log('key: ', key)
      return {[key]: value.value}
    })
    
    _.assign(props, ...refs)
    
    this.props.addComponent(props)
    
    _.each(this.refs, r => r.value = '')
  }
  
  render() {
    return (
      <div>
        {this.componentNames()}
        {this.state.selected && this.fields()}
      </div>
    );
  }
}

export default Sidebar;
