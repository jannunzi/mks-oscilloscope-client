

const userReducers = (state = {users: []}, action) => {
    switch (action.type) {
        case "REMOVE_USER":
        case "FIND_ALL_USERS":
        case "CREATE_USER":
            return {
                users: action.users
            }
        default:
            return {
                users: []
            }
    }
}

export default userReducers;
