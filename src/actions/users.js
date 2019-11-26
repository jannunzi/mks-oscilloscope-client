export const REMOVE_USER = 'REMOVE_USER';
export const FIND_ALL_USERS = 'FIND_ALL_USERS';
export const CREATE_USER = 'CREATE_USER';

export const LOGIN = 'LOGIN';
export const login = (response) => ({
    type: 'LOGIN',
    response: response
})

export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const PROFILE = 'PROFILE';
