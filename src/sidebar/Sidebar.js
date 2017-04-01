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
      <form name="createForm" onSubmit={this.onAddComponentClick}>
        {
          _.map(this.state.selected.expectedProps, (obj, key) => {
            return (
              <div key={key} className="field">
                <p className="control">
                  { obj.type === 'string' &&
                    <label>
                      {key}
                      <input
                        type="text"
                        name={key}
                        ref={key} />
                    </label>
                  }
                  {
                    obj.type === 'radio' &&
                    obj.options.map( o => {
                      return (
                        <label className="radio" key={o.value}>
                          <input type="radio" name={key} value={o.value} />
                          {o.label}
                        </label>
                      )
                    })
                  }
                </p>
              </div>
            )
          })
        }
        <button type="submit">Add</button>
      </form>
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
  
  onAddComponentClick = (e) => {
    e.preventDefault()
    
    const elems = e.target.elements
    const key = this.state.selected.name
    
    let props = {
      componentName: key,
      _id: Math.random()
    }
    
    const refs = _.map(this.state.selected.expectedProps, (value, key) => {
      return {[key]: elems[key].value}
    })
    
    // const refs = _.map(this.refs, (value, key) => {
    //   return {[key]: value.value}
    // })
    
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
