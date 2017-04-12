import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './App.css';
import Sidebar from './sidebar/Sidebar';
import Preview from './preview/Preview'
import Nav from './nav/Nav'

import { getComponents, getSelectedComponent } from './reducers/ComponentReducer'
import * as componentActions from './actions/ComponentActions'

class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <div className="columns">
          <div className="column is-one-quarter">
            <Sidebar
              selectedComponent={this.props.selectedComponent}
              selectComponent={this.props.actions.selectComponent}
              addComponent={this.props.actions.addComponent}
              updateComponent={this.props.actions.updateComponent} />
          </div>
          <div className="column">
            <Preview
              selectComponent={this.props.actions.selectComponent}
              selectedComponent={this.props.selectedComponent}
              components={this.props.components} />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    components: getComponents(state),
    selectedComponent: getSelectedComponent(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(componentActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
