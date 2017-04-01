import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './App.css';
import Sidebar from './sidebar/Sidebar';
import Preview from './preview/Preview'

import { getComponents } from './reducers/ComponentReducer'
import * as componentActions from './actions/ComponentActions'

class App extends Component {
  render() {
    return (
      <div className="columns">
        <div className="column is-one-quarter">
          <Sidebar addComponent={this.props.actions.addComponent} />
        </div>
        <div className="column">
          <Preview components={this.props.components} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    components: getComponents(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(componentActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
