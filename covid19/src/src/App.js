import React, {Component} from 'react';
import './App.css';
import img from './download.jpg';
import Select from './select.js';



class App extends Component {

  render() {
    return (
      <div  className="App">
        <header className="App-header">
          <img src={img}  alt="logo" />
        </header>
        <Select />
      </div>
    );
  }
}

export default App;
