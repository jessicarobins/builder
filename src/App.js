import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as components from './components';
import * as _ from 'lodash';

class App extends Component {
  
  data() {
    return ([{
        componentName: 'Button',
        text: 'hi',
        _id: '1'
      }, {
        componentName: 'Button',
        text: 'jess',
        _id: '2'
      }
    ])
  }
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {
          this.data().map( (value) => {
            const Comp = components[value.componentName]
            return <Comp key={value._id} {...value} />
          })
        }
      </div>
    );
  }
}

export default App;
