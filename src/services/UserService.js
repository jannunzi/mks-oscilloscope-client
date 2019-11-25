import utilities from "../utils/utilities";

const baseUrl = utilities.getBaseUrl();

export default class UserService {
    static createUser = (newUser) =>
        fetch(`${baseUrl}/api/users`, {
            method: 'post',
            body: JSON.stringify(newUser),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
    static findAllUsers = () =>
        fetch(`${baseUrl}/api/users`)
            .then(response => response.json())
    static deleteUser = (userId) =>
        fetch(`${baseUrl}/api/users/${userId}`, {
            method: 'delete'
        })
        .then(response => response.json())
}
