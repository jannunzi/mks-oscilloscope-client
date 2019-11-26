import {
    REMOVE_USER,
    FIND_ALL_USERS,
    CREATE_USER,
    LOGIN,
    LOGOUT,
    REGISTER,
    PROFILE
} from "../actions/users";

const userReducers = (state = {users: []}, action) => {
    switch (action.type) {
        case REMOVE_USER:
        case FIND_ALL_USERS:
        case CREATE_USER:
            return {
                users: action.users
            }
        case LOGIN:
        case LOGOUT:
        case REGISTER:
            return {
                response: action.response
            }
        case PROFILE:
            return {
                currentUser: action.currentUser
            }
        default:
            return {
                users: []
            }
    }
}

export default userReducers;
