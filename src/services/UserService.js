import utilities from "../utils/utilities";

const baseUrl = utilities.getBaseUrl();

export default class UserService {

    static profile = () =>
        fetch(`${baseUrl}/api/profile`, {
            method: 'post',
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())

    static register = (newUser) =>
        fetch(`${baseUrl}/api/register`, {
            method: 'post',
            body: JSON.stringify(newUser),
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())

    static login = (user) =>
        fetch(`${baseUrl}/api/login`, {
            method: 'post',
            body: JSON.stringify(user),
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())

    static logout = () =>
        fetch(`${baseUrl}/api/logout`, {
            method: 'post',
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())

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
