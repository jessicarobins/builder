import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './App.css';
import Sidebar from './sidebar/Sidebar';
import Preview from './preview/Preview'
import Nav from './nav/Nav'

import * as componentActions from './actions/ComponentActions'
import { getRows } from './reducers/RowReducer'
import * as rowActions from './actions/RowActions'

class App extends Component {
  render() {
    return (
      <div>
        <Nav addRow={this.props.rowActions.addRow} />
        <div className="columns">
          <div className="column is-one-quarter">
            <Sidebar addComponent={this.props.componentActions.addComponent} />
          </div>
          <div className="column">
            <Preview rows={this.props.rows} />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    rows: getRows(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    componentActions: bindActionCreators(componentActions, dispatch),
    rowActions: bindActionCreators(rowActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
