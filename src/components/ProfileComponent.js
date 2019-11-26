import React from 'react'
import {BrowserRouter as Router, Link, Redirect} from "react-router-dom";
import UserService from "../services/UserService";
import {connect} from "react-redux";

const stateToPropertyMapper = (state) => ({
    currentUser: state.currentUser
})

const dispatchToPropertyMapper = (dispatch) => ({
    logout: () =>
        UserService.logout()
            .then(currentUser => dispatch({
                type: 'LOGOUT',
                currentUser: currentUser
            })),
    profile: () =>
        UserService.profile()
            .then(currentUser => dispatch({
                type: 'PROFILE',
                currentUser: currentUser
            }))
})

class ProfileComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: ''
        }
    }

    componentDidMount() {
        this.props.profile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props !== prevProps) {
            this.setState({
                username: this.props.currentUser.username
            })
        }
    }

    updateForm = (state) =>
        this.setState(state)

    render() {
        return(
            <div className="mks mks-form">
                <h1>Profile</h1>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        placeholder="alice"
                        className="form-control"
                        onChange={(e) => this.updateForm({username: e.target.value})}
                        value={this.state.username}/>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="!@&#^%"
                        className="form-control"/>
                    <br/>
                    <button
                        onClick={this.props.logout}
                        className="btn btn-primary">Logout</button>
                    <br/>
                    <Link to="/admin/users">Users</Link>
                </div>
            </div>
        )
    }
}

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(ProfileComponent)
