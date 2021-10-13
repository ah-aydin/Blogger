import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATE_SUCCESS,
    ACTIVATE_FAIL,
    LOGOUT
} from './auth_types';

const axios = require('axios').default;

/**
 * Authenticates a user with the given credentials if it is present in the 
 * database.
 * @param email email of the user to be authenticated 
 * @param password password of the user to be authenticated
 */
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({email, password});

    try {
        const response = await axios.post(`${process.env.REACT_APP_URL}auth/jwt/create/`, body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data
        });
    } catch (e) {
        console.log(e);
        dispatch({
            type: LOGIN_FAIL,
            payload: e.response.data
        });
    }
}

/**
 * Create's a user with the given credentials and send's out an activation email 
 * @param email email of the user 
 * @param name name of the user
 * @param last_name last name of the user
 * @param password password of the user
 * @param re_password password check field
 */
export const signup = (email, name, last_name, password, re_password) => async dispatch => {
    if (password !== re_password) {
        dispatch({
            type: 'ERROR',
            payload: ['Password\'s to not match']
        });
    }
    else {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({email, name, last_name, password, re_password});
    
        try {
            const response = await axios.post(`${process.env.REACT_APP_URL}auth/users/`, body, config);
            dispatch({
                type: SIGNUP_SUCCESS,
                payload: response.data
            });
        } catch (e) {
            dispatch({
                type: SIGNUP_FAIL,
                payload: e.response.data
            });
        }
    }
}

/**
 * Activate the user that the parameters belong to
 * @param uid the uid snached from the url
 * @param token the token snached from the url
 */
export const activate = (uid, token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({uid, token});

    try {
        const response = await axios.post(`${process.env.REACT_APP_URL}auth/users/activation/`, body, config);
        dispatch({
            type: ACTIVATE_SUCCESS,
            payload: null
        });
    } catch (e) {
        dispatch({
            type: ACTIVATE_FAIL,
            payload: e.response.data
        });
    }
}

/**
 * Log's out the currently logged in user by removing it's access and refresh token
 * from the local storage.
 */
export const logout = () => async dispatch => {
    dispatch({
        type: LOGOUT,
        payload: null
    })
}
