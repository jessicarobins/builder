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
  
  fields(c, values) {
    return (
      _.map(c.expectedProps, (obj, key) => {
        return (
          <div key={key} className="field">
            <p className="control">
              { obj.type === 'string' &&
                <label>
                  {key}
                  <input
                    type="text"
                    name={key}
                    defaultValue={_.get(values, key)}
                    ref={key} />
                </label>
              }
              {
                obj.type === 'radio' &&
                obj.options.map( o => {
                  return (
                    <label className="radio" key={o.value}>
                      <input
                        type="radio"
                        name={key}
                        value={o.value}
                        defaultChecked={o.value === _.get(values, key)}/>
                      {o.label}
                    </label>
                  )
                })
              }
            </p>
          </div>
        )
      })
    )
  }
  
  createForm() {
    return (
      <form onSubmit={this.onAddComponentClick}>
        {
          this.fields(this.state.selected)
        }
        <button className="button is-primary" type="submit">Add</button>
      </form>
    )
  }
  
  updateForm() {
    const c = components[this.props.selectedComponent.componentName]
    return (
      <form onSubmit={this.onUpdateComponentClick}>
        {
          this.fields(c, this.props.selectedComponent)
        }
        <a className="button is-primary" type="submit">Update</a>
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
    this.props.selectComponent(null)
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
    
    _.assign(props, ...refs)
    
    this.props.addComponent(props)
    
    _.each(this.refs, r => r.value = '')
    this.setState({selected: null})
  }
  
  onUpdateComponentClick = (e) => {
    e.preventDefault()
    
    const elems = e.target.elements
    const c = components[this.props.selectedComponent.componentName]
    
    const refs = _.map(c.expectedProps, (value, key) => {
      return {[key]: elems[key].value}
    })
    
    let props = {
      _id: this.props.selectedComponent._id,
      componentName: this.props.selectedComponent.componentName
    }
    _.assign(props, ...refs)
    
    this.props.updateComponent(props)
    this.setState({selected: null})
  }
  
  render() {
    return (
      <div>
        {this.componentNames()}
        {this.state.selected && this.createForm()}
        {this.props.selectedComponent && this.updateForm()}
      </div>
    );
  }
}

export default Sidebar;
