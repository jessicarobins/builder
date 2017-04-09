import React, { Component } from 'react';

const gridStyles = {
  display: 'grid',
  gridTemplateColumns: '20% 20% 20% 20% 20%',
  gridTemplateRows: '20% 20% 20% 20% 20%',
  width: '50vw',
  height: '100vh',
  border: '1px solid black'
}

class Grid extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      dragTarget: null
    }
  }
  
  dropHandler = (e) => {
    e.preventDefault()
    const el = this.state.dragTarget
    
    //get dimensions of grid element
    const h = e.target.clientHeight
    const w = e.target.clientWidth
    
    //find relative position of grid
    const l = e.clientX - e.target.offsetLeft
    const t = e.clientY - e.target.offsetTop
    const { col, row } = this.doTheMath(l, t, w, h)
    
    el.style.gridColumn = `${col} / span 1`
    el.style.gridRow = `${row} / span 1`
    this.setState({dragTarget: null})
  }
  
  dragoverHandler(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move"
  }
  
  dragstartHandler = (e) => {
    this.setState({dragTarget: e.target})
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
          React.Children.map(this.props.children, child => {
            return (
              <div draggable="true" onDragStart={this.dragstartHandler}>
                {child}
              </div>
            )
          })
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
