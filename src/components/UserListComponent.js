import React from 'react'
import {Link} from "react-router-dom";

export default class UserListComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            newUsername: ''
        }
    }

    componentDidMount() {
        this.props.findAllUsers()
    }

    updateForm = (event) =>
        this.setState({newUsername: event.target.value})

    render() {
        return (
            <div>
                <h1>User List</h1>
                <ul className="list-group">
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col-11">
                                <input
                                    value={this.state.newUsername}
                                    onChange={this.updateForm}
                                    className="form-control"/>
                            </div>
                            <div className="col-1">
                                <button
                                    onClick={() => {
                                        this.setState({newUsername: ''})
                                        this.props.createUser(this.state.newUsername)
                                    }}
                                    className="btn btn-success pull-right">
                                    <i className="fa fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    </li>
                    {
                        this.props.users && this.props.users.map(user =>
                            <li key={user._id} className="list-group-item">
                                <Link to={`/profile/${user._id}`}>
                                    {user.username}
                                </Link>
                                <button className="btn btn-danger pull-right">
                                    <i onClick={(e) => this.props.removeUser(user._id)} className="fa fa-remove"></i>
                                </button>
                            </li>
                        )
                    }
                </ul>
            </div>
        );
    }
}
