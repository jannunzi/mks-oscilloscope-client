import React, { Component } from 'react';
import {Oscilloscope} from "./Oscilloscope";
import './mks.css'
import {Dashboard} from "./Dashboard";
import './css/bootstrap/dist/css/bootstrap.min.css'
import './css/fontawesome/css/font-awesome.min.css'
import Buffer from "./Buffer";

const url = "http://localhost:5000"
// const url = "https://secure-hamlet-60495.herokuapp.com"

class App extends Component {
  buffer = new Buffer(25)
  constructor(props) {
    super(props);
    this.state = {
      oscilloscopeData: this.buffer.get()
    };
    this.eventSource = new EventSource(`${url}/events`);
  }

  componentDidMount() {
    this.eventSource.addEventListener('mks-event', (e) => this.updateOscilloscope(JSON.parse(e.data)));
    this.eventSource.addEventListener('closedConnection', () => this.stopUpdates());
  }
  componentWillUnmount() {
    this.eventSource.close()
  }

  updateOscilloscope(data) {
    this.buffer.push(data)
    console.log(this.buffer.get())
    const d = [
      {
        x: 0, y: -10, z: 10
      },
      {
        x: 0, y: 10, z: 10
      },
        ...this.buffer.get()
    ]
    this.setState({
      oscilloscopeData: d
    })
  }

  stopUpdates() {
    this.eventSource.close();
  }

  render() {
    return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-10">
              <Oscilloscope data={this.state.oscilloscopeData}/>
            </div>
            <div className="col-2">
              <Dashboard/>
            </div>
          </div>
        </div>
    );
  }
}

export default App;
