import React, { Component } from 'react';
import update from 'immutability-helper';
import * as _ from 'lodash';

const gridStyles = {
  display: 'grid',
  gridTemplateColumns: '20% 20% 20% 20% 20%',
  gridTemplateRows: '20% 20% 20% 20% 20%',
  minHeight: '95vh',
  border: '1px solid black'
}

const THRESHOLD = 10

class Grid extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      dragTarget: null,
      items: {},
      resizing: false
    }
  }
  
  dropHandler = (e) => {
    e.preventDefault()
    
    const { el, dragKey } = this.state.dragTarget
    
    if (e.target !== el) {
      //get dimensions of grid element
      const h = e.target.clientHeight
      const w = e.target.clientWidth
      
      //find relative position of grid
      const l = e.clientX - e.target.offsetLeft
      const t = e.clientY - e.target.offsetTop
      const { col, row } = this.doTheMath(l, t, w, h)
      
      // const style = {
      //   gridColumn: `${col} / span 1`,
      //   gridRow: `${row} / span 1`
      // }
      
      const style = {
        gridColumnStart: col,
        gridRowStart: row
      }
      
      const items = update(this.state.items, {
         [dragKey]: {$set: style}
      });
      
      this.setState({items: items})
    }
    this.setState({dragTarget: null})
  }
 
  dragoverHandler(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move"
  }
  
  dragstartHandler = (e, key) => {
    this.setState({dragTarget: {el: e.target, dragKey: key}})
  }
  
  doTheMath(x, y, w, h) {
    const col = (x*this.props.rows/w | 0) + 1
    const row = (y*this.props.cols/h | 0) + 1
    return {col: col, row: row}
  }
  
  mouseOver = (e, dragKey) => {
    const style = {
      cursor: 'auto'
    }
    
    // right
    if (Math.abs(e.clientX - e.target.offsetParent.offsetLeft - e.target.offsetWidth) < THRESHOLD || this.state.resizing) {
      style.cursor = 'col-resize'
    }
    
    const currentCursor = _.get(this.state.items, dragKey, 'cursor')
    
    if (currentCursor !== style.cursor) {
    
      const items = update(this.state.items, {
         [dragKey]: {$apply: function(value) {
           if(value) {
             return {...value, ...style}
           }
           return style
         }}
      });
      
      this.setState({items: items})
    }
  }
  
  mouseDown = (e, key) => {
    if (!this.props.selectedComponent) {
      return false;
    }
    if (Math.abs(e.clientX - e.target.offsetParent.offsetLeft - e.target.offsetWidth) < THRESHOLD) {
      this.setState({resizing: true, dragTarget: {el: e.target, dragKey: key}})
    }
  }
  
  mouseUp = e => {
    if(this.state.resizing) {
      const dragKey = this.state.dragTarget.dragKey
      
      this.setState({resizing: false})
      //logic goes here
      
      //get dimensions of grid element
      const h = e.target.clientHeight
      const w = e.target.clientWidth
      
      const l = e.clientX - e.target.offsetLeft
      const t = e.clientY - e.target.offsetTop
      const { col, row } = this.doTheMath(l, t, w, h)
      
      const style = {
        gridColumnEnd: col,
        gridRowEnd: row
      }
      
      console.log('style: ', style)
      
      const items = update(this.state.items, {
        [dragKey]: {$apply: function(value) {
          if(value) {
            return {...value, ...style}
          }
          return style
        }}
      });
      
      this.setState({items: items, dragTarget: null})
    }
  }
   
  //workaround for gridcolumnstart/end unitless react thing
  gridStyles(s) {
    const styles = {
      gridColumn: `${_.get(s, 'gridColumnStart') || 'auto'} / ${_.get(s, 'gridColumnEnd') || 'auto'}`,
      gridRow: `${_.get(s, 'gridRowStart') || 'auto'} / ${_.get(s, 'gridRowEnd') || 'auto'}`
    }
    
    return {...s, ...styles}
  }
    
  render() {
    const c = this.props.selectedComponent
    return (
      <div
        onDragOver={this.dragoverHandler}
        onMouseUp={this.mouseUp}
        onDrop={this.dropHandler}
        style={gridStyles}>
        {
          React.Children.map(this.props.children,
            (child) => {
              let dragProps = {
                draggable: !this.state.resizing,
                onMouseDown: e => this.mouseDown(e, child.key),
                onDragStart: e => this.dragstartHandler(e, child.key),
                style: this.gridStyles(_.get(this.state.items, child.key))
              }
              if (c && _.toString(c._id) === child.key) {
                dragProps.onMouseMove = (e) => this.mouseOver(e, child.key)
              }
              return React.cloneElement(child, dragProps)
            }
          )
        }
      </div>
    );
  }
}

Grid.defaultProps = {
  rows: 5,
  cols: 5
};

export default Grid;
