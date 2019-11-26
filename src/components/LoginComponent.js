import React from 'react'
import {Link, Redirect} from "react-router-dom";
import UserService from "../services/UserService";
import {connect} from "react-redux";
import {login} from "../actions/users";

const stateToPropertyMapper = (state) => {
    return {
        response: state.response
    }
}

const dispatchToPropertyMapper = (dispatch) => ({
    login: (user) =>
        UserService.login(user)
            .then((response) => dispatch(login(response)))
})

class LoginComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    updateForm = (update) =>
        this.setState(update)

    render() {
        if(this.props.response) {
            return <Redirect to='/profile' />
        }
        return(
            <div className="mks mks-form">
                <h1>Login</h1>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        placeholder="alice"
                        className="form-control"
                        value={this.state.username}
                        onChange={(e) => {
                            e.persist()
                            this.updateForm({username: e.target.value})
                        }}/>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="!@&#^%"
                        className="form-control"
                        value={this.state.password}
                        onChange={(e) => {
                            e.persist()
                            this.updateForm({password: e.target.value})
                        }}/>
                    <br/>
                    <button
                        onClick={() => this.props.login({
                            username: this.state.username,
                            password: this.state.password
                        })}
                        className="btn btn-primary">
                        Login
                    </button>
                    <Link to="/register">Register</Link>
                </div>
            </div>
        )
    }
}

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper)
(LoginComponent)
