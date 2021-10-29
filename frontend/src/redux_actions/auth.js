import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATE_SUCCESS,
    ACTIVATE_FAIL,
    LOGOUT,
    USER_LOAD_SUCCESS,
    USER_LOAD_FAIL,
    CHANGE_USER_DATA_SUCCESS,
    CHANGE_USER_DATA_FAIL,
    GET_USER_FOLLOWERS_SUCCESS,
    GET_USER_FOLLOWERS_FAIL,
    GET_USER_FOLLOWERS_NEXT_SUCCESS,
    GET_USER_FOLLOWERS_NEXT_FAIL,
    GET_USER_BLOGS_SUCCESS,
    GET_USER_BLOGS_FAIL,
    GET_USER_BLOGS_NEXT_SUCCESS,
    GET_USER_BLOGS_NEXT_FAIL
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
        // Load in user data after loggin in
        dispatch(load_user());
    } catch (e) {
        dispatch({
            type: LOGIN_FAIL,
            payload: e.response
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
        await axios.post(`${process.env.REACT_APP_URL}auth/users/activation/`, body, config);
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
    });
}

/**
 * Loads the user that is the owner of the stored access token
 */
export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access')}`
            }
        };

        try {
            let response = await axios.get(`${process.env.REACT_APP_URL}auth/users/me/`, config);
            const id = response.data['id'];
            response = await axios.get(`${process.env.REACT_APP_URL}api/account/${id}/`, config);
            dispatch({
                type: USER_LOAD_SUCCESS,
                payload: response.data
            });
            dispatch(get_user_followers(response.data['followers_url']));
            dispatch(get_user_blogs(response.data['email']));
        } catch (e) {
            dispatch({
                type: USER_LOAD_FAIL,
                payload: e.response
            });
        }
    } else {
        dispatch({
            type: USER_LOAD_FAIL
        });
    }
}

/**
 * Change the data of the logged in user
 * @param id Id of the user.
 * @param name Name of the user
 * @param last_name Last name of the user
 * @param email Email of the user (this should not change)
 */
export const change_user_data = (id, name, last_name, email) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access')}`
            }
        };

        const body = {
            name: name,
            last_name: last_name,
            email: email
        };
        
        try {
            await axios.put(`${process.env.REACT_APP_URL}api/account/${id}/`, body, config);
            dispatch({
                type: CHANGE_USER_DATA_SUCCESS,
            });
            dispatch(load_user());
        } catch (e) {
            dispatch({
                type: CHANGE_USER_DATA_FAIL,
                payload: e.response.data
            });
        }
    } else {
        dispatch({
            type: CHANGE_USER_DATA_FAIL
        });
    }
}

/**
 * Get's the followers of the logged in user
 * @param url Url to make the request
 */
export const get_user_followers = (url) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await axios.get(url, config);
        dispatch({
            type: GET_USER_FOLLOWERS_SUCCESS,
            payload: response.data
        });
    } catch (e) {
        dispatch({
            type: GET_USER_FOLLOWERS_FAIL,
            payload: e.response
        });
    }
}


/**
 * Get's the next list of followers of the logged in user
 * @param url Url to make the request
 */
 export const get_user_followers_next = (url) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    console.log(url);

    try {
        const response = await axios.get(url, config);
        dispatch({
            type: GET_USER_FOLLOWERS_NEXT_SUCCESS,
            payload: response.data
        });
    } catch (e) {
        dispatch({
            type: GET_USER_FOLLOWERS_NEXT_FAIL,
            payload: e.response
        });
    }
}

/**
 * Get's the blogs of the authenticated user
 * @param email Email of the user
 */
export const get_user_blogs = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await axios.get(`${process.env.REACT_APP_URL}api/blog/?search=${email}`, config);
        dispatch({
            type: GET_USER_BLOGS_SUCCESS,
            payload: response.data
        });
    } catch (e) {
        dispatch({
            type: GET_USER_BLOGS_FAIL,
            payload: e.response
        });
    }
}

/**
 * Get's the next list of blogs of the logged in user
 * @param url Url to make the request
 */
export const get_user_blogs_next = (url) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await axios.get(`${url}`, config);
        dispatch({
            type: GET_USER_BLOGS_NEXT_SUCCESS,
            payload: response.data
        });
    } catch (e) {
        dispatch ({
            type: GET_USER_BLOGS_NEXT_FAIL,
            payload: e.response
        });
    }
}