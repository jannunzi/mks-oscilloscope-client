import React from 'react'
import {Link} from "react-router-dom";

export default class RegisterComponent extends React.Component {
    render() {
        return(
            <div className="mks mks-form">
                <h1>Register</h1>
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
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        placeholder="!@&#^%"
                        className="form-control"/>
                    <button className="btn btn-primary">Register</button>
                    <Link to="/Login">Login</Link>
                </div>
            </div>
        )
    }
}
