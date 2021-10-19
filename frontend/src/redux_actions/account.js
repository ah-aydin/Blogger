import axios from 'axios';
import {
    GET_SEARCH_ACCOUNTS_SUCCESS,
    GET_SEARCH_ACCOUNTS_FAIL,
    GET_SEARCH_ACCOUNTS_NEXT_SUCCESS,
    GET_SEARCH_ACCOUNTS_NEXT_FAIL,
    GET_ACCOUNT_SUCCESS,
    GET_ACCOUNT_FAIL,
    GET_ACCOUNT_BLOGS_SUCCESS,
    GET_ACCOUNT_BLOGS_FAIL,
    GET_ACCOUNT_BLOGS_NEXT_SUCCESS,
    GET_ACCOUNT_BLOGS_NEXT_FAIL,
    GET_ACCOUNT_FOLLOWERS_SUCCESS,
    GET_ACCOUNT_FOLLOWERS_FAIL,
    GET_ACCOUNT_FOLLOWERS_NEXT_SUCCESS,
    GET_ACCOUNT_FOLLOWERS_NEXT_FAIL
} from './account_types';

/**
 * Makes a GET request on the backend to get accounts that contain the given
 * keyword.
 * @param search_keyword The keyword to search for in the accounts 
 */
 export const search_accounts = (search_keyword) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await axios.get(`${process.env.REACT_APP_URL}api/account/?search=${search_keyword}`, config);
        dispatch({
            type: GET_SEARCH_ACCOUNTS_SUCCESS,
            payload: response.data
        });
    } catch (e) {
        dispatch({
            type: GET_SEARCH_ACCOUNTS_FAIL,
            payload: e.response
        });
    }
}

/**
 * Makes a GET request on the given URL.
 * @param url Url for the next list to be loaded
 * @returns 
 */
export const search_accounts_next = (url) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    try {
        const response = await axios.get(`${url}`, config);
        dispatch({
            type: GET_SEARCH_ACCOUNTS_NEXT_SUCCESS,
            payload: response.data
        });
    } catch (e) {
        dispatch({
            type: GET_SEARCH_ACCOUNTS_NEXT_FAIL,
            payload: e.response
        });
    }
}

/**
 * Make a GET request to the backend for retrieving a account with the
 * given id.
 * @param id Id of the account that is going to be retrieved
 */
 export const get_account = (id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await axios.get(`${process.env.REACT_APP_URL}api/account/${id}/`, config);
        dispatch({
            type: GET_ACCOUNT_SUCCESS,
            payload: response.data
        });
    } catch (e) {
        dispatch({
            type: GET_ACCOUNT_FAIL,
            payload: e
        });
    }
}

/**
 * Makes a GET request with the given users email
 * @param email of the user who's blogs we want to retrieve
 */
export const get_account_blogs = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await axios.get(`${process.env.REACT_APP_URL}api/blog/?search=${email}`, config);
        dispatch({
            type: GET_ACCOUNT_BLOGS_SUCCESS,
            payload: response.data
        });
    } catch (e) {
        dispatch({
            type: GET_ACCOUNT_BLOGS_FAIL,
            payload: e.response
        });
    }
}

/**
 * Get the next set of blogs
 * @param url The url to make the request
 */
 export const get_account_blogs_next = (url) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await axios.get(`${url}`, config);
        dispatch({
            type: GET_ACCOUNT_BLOGS_NEXT_SUCCESS,
            payload: response.data
        });
    } catch (e) {
        dispatch ({
            type: GET_ACCOUNT_BLOGS_NEXT_FAIL,
            payload: e.response
        });
    }
}

/**
 * Creates/destroys a follow given a user id and the authenticated user
 * @param account_id id of account to be follwed
 */
export const follow_account = (account_id) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
    };

    const body = {
        'follow_id': `${account_id}`
    }

    try {
        axios.post(`${process.env.REACT_APP_URL}api/account/follow/`, body, config);
    } catch (e) {
        console.log('Follow failed');
    }
}

/**
 * Makes a GET request to get the followers of an account
 * @param account_id Id of the account 
 */
export const get_account_followers = (account_id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await axios.get(`${process.env.REACT_APP_URL}api/account/${account_id}/followers/`, config);
        dispatch({
            type: GET_ACCOUNT_FOLLOWERS_SUCCESS,
            payload: response.data
        });
    } catch (e) {
        dispatch({
            type: GET_ACCOUNT_FOLLOWERS_FAIL,
            payload: e.response
        });
    }
};

/**
 * Makes a GET request to get the next list of account followers
 * @param url The url to make the request from 
 */
export const get_account_followers_next = (url) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await axios.get(`${url}`, config);
        dispatch({
            type: GET_ACCOUNT_FOLLOWERS_NEXT_SUCCESS,
            payload: response.data
        });
    } catch (e) {
        dispatch ({
            type: GET_ACCOUNT_FOLLOWERS_NEXT_FAIL,
            payload: e.response
        });
    }
}