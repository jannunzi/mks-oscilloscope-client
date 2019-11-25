import React from 'react'
import {Link} from "react-router-dom";

export default class LoginComponent extends React.Component {
    render() {
        return(
            <div className="mks mks-form">
                <h1>Login</h1>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        placeholder="alice"
                        className="form-control"/>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="!@&#^%"
                        className="form-control"/>
                    <button className="btn btn-primary">Login</button>
                    <Link to="/register">Register</Link>
                </div>
            </div>
        )
    }
}
