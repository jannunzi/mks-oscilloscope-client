import React from 'react'
import UserListComponent from "../components/UserListComponent";
import {connect} from 'react-redux'
import UserService from "../services/UserService";

const stateToPropertyMapper = (state) => ({
    users: state.users
})

const dispatchToPropertyMapper = (dispatch) => ({
    createUser: (username) => UserService
        .createUser({username: username})
        .then(users => dispatch({
                type: "CREATE_USER",
                users: users
            })
        ),
    removeUser: (userId) => UserService
        .deleteUser(userId)
        .then(users => dispatch({
                type: "REMOVE_USER",
                users: users
            })
        ),
    findAllUsers: () => UserService
        .findAllUsers()
        .then(users => {
            dispatch({
                type: "FIND_ALL_USERS",
                users: users
            })
        })
})

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
    )(UserListComponent)
