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

class Grid extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      dragTarget: null,
      items: {}
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
      
      const style = {
        gridColumn: `${col} / span 1`,
        gridRow: `${row} / span 1`
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
    
  render() {
    return (
      <div
        onDragOver={this.dragoverHandler}
        onDrop={this.dropHandler}
        style={gridStyles}>
        {
          React.Children.map(this.props.children,
            (child) => React.cloneElement(child, {
              draggable: true,
              onDragStart: (e) => this.dragstartHandler(e, child.key),
              style: _.get(this.state.items, child.key)
            })
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
