import React, { Component } from 'react';
import Row from '../Row/Row'

class Preview extends Component {
  render() {
    return (
      <div>
        {
          this.props.rows.map( (row) => {
            return <Row key={row._id} row={row} />
          })
        }
      </div>
    );
  }
}

export default Preview;
