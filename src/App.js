import React, { Component } from 'react';
import './mks.css'
import './css/bootstrap/dist/css/bootstrap.min.css'
import './css/fontawesome/css/font-awesome.min.css'
import Buffer from "./Buffer";
import Oscilloscope2 from "./reactTimeseriesCharts/lines/Oscilloscope2";
import {Link, Route, BrowserRouter as Router} from "react-router-dom";
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";
import UserReducer from "./reducers/UserReducer"
import {createStore} from "redux";
import {Provider} from "react-redux";
import UserListContainer from "./containers/UserListContainer";

const store = createStore(UserReducer)

const url = "http://localhost:5000"
// const url = "https://secure-hamlet-60495.herokuapp.com"

class App extends Component {
  buffer = new Buffer(25)
  constructor(props) {
    super(props);
    this.state = {
      oscilloscopeData: this.buffer.get()
    };
    // this.eventSource = new EventSource(`${url}/events`);
  }

  componentDidMount() {
    // this.eventSource.addEventListener('mks-event', (e) => this.updateOscilloscope(JSON.parse(e.data)));
    // this.eventSource.addEventListener('closedConnection', () => this.stopUpdates());
  }
  componentWillUnmount() {
    // this.eventSource.close();
  }

  updateOscilloscope(data) {
    this.buffer.push(data);
    const d = [
      // { x: 0, y: -10, z: 10 },
      // { x: 0, y: 10, z: 10  },
        ...this.buffer.get()
    ];
    this.setState({
      oscilloscopeData: d
    });
  }

  stopUpdates() {
    this.eventSource.close();
  }

  render() {
    return (
        <div className="container-fluid">
          <Provider store={store}>
            <Router>
              <Link to="/login">Login</Link> |
              <Link to="/register">Register</Link> |
              <Link to="/admin/users">Users</Link> |
              <Link to="/oscilloscope">Oscilloscope</Link>
              <Route path="/oscilloscope" render={() => (<Oscilloscope2 data={this.state.oscilloscopeData}/>)}/>
              <Route path="/login" component={LoginComponent}/>
              <Route path="/register" component={RegisterComponent}/>
              <Route path="/admin/users" component={UserListContainer}/>
              <Route exact path="/" component={LoginComponent} />
            </Router>
          </Provider>
        </div>
    );
  }
}

export default App;
