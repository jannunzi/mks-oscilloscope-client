import React from 'react'
import {Link, Redirect} from "react-router-dom";
import UserService from "../services/UserService";
import {connect} from "react-redux";

const stateToPropertyMapper = (state) => {
    return {
        response: state.response
    }
}

const dispatchToPropertyMapper = (dispatch) => ({
    register: (user) =>
        UserService.register(user)
            .then((response) => dispatch({
                type: 'REGISTER',
                response: response
            }))
})

class RegisterComponent extends React.Component {
    constructor(props) {
        super(props);
            this.state = {
            username: '',
            password: '',
            password2: ''
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
                <h1>Register</h1>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        placeholder="alice"
                        className="form-control"
                        value={this.state.username}
                        onChange={(e) => this.updateForm({username: e.target.value})}/>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="!@&#^%"
                        className="form-control"
                        value={this.state.password}
                        onChange={(e) => this.updateForm({password: e.target.value})}/>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        placeholder="!@&#^%"
                        className="form-control"
                        value={this.state.password2}
                        onChange={(e) => this.updateForm({password2: e.target.value})}/>
                    <br/>
                    <button
                        onClick={() => this.props.register({
                            username: this.state.username,
                            password: this.state.password
                        })}
                        className="btn btn-primary">Sign up</button>
                    <br/>
                    <Link to="/Login">Sign in</Link>
                </div>
            </div>
        )
    }
}

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper)
(RegisterComponent)

