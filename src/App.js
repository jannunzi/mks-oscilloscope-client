import React, { Component } from 'react';
import {Oscilloscope} from "./Oscilloscope";
import './hhh.css'

// const url = "http://localhost:5000"
const url = "https://secure-hamlet-60495.herokuapp.com"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oscilloscopeData: [
        {x: 1, y: 3, z: 10},
        {x: 2, y: 4, z: 10},
        {x: 3, y: 8, z: 10},
        {x: 4, y: 11, z: 10}
      ]
    };
    this.eventSource = new EventSource(`${url}/events`);
  }

  componentDidMount() {
    this.eventSource.addEventListener('ddd', (e) => this.updateOscilloscope(JSON.parse(e.data)));
    this.eventSource.addEventListener('closedConnection', () => this.stopUpdates());
  }

  updateOscilloscope(data) {
    data = [
      {x:0, y:10},
      {x:0, y:-10},
      ...data
    ]
    this.setState({
      oscilloscopeData: data
    })
  }

  stopUpdates() {
    this.eventSource.close();
  }

  render() {
    return (
        <div className="App">
          <Oscilloscope data={this.state.oscilloscopeData}/>
        </div>
    );
  }
}

export default App;
