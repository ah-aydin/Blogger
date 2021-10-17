import axios from 'axios';
import {
    GET_SEARCH_BLOGS_SUCCESS,
    GET_SEARCH_BLOGS_FAIL,
    GET_SEARCH_BLOGS_NEXT_SUCCESS,
    GET_SEARCH_BLOGS_NEXT_FAIL,
    GET_BLOG_SUCCESS,
    GET_BLOG_FAIL
} from './blog_types';

/**
 * Makes a GET request on the backend to get blogs that contain the given
 * keyword.
 * @param search_keyword The keyword to search for in the blogs 
 */
export const search_blogs = (search_keyword) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await axios.get(`${process.env.REACT_APP_URL}api/blog/?search=${search_keyword}`, config);
        dispatch({
            type: GET_SEARCH_BLOGS_SUCCESS,
            payload: response.data
        });
    } catch (e) {
        dispatch({
            type: GET_SEARCH_BLOGS_FAIL,
            payload: e.response.data
        });
    }
}

/**
 * Makes a GET request on the given URL.
 * @param url Url for the next list to be loaded
 * @returns 
 */
export const search_blogs_next = (url) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    try {
        const response = await axios.get(`${url}`, config);
        dispatch({
            type: GET_SEARCH_BLOGS_NEXT_SUCCESS,
            payload: response.data
        });
    } catch (e) {
        dispatch({
            type: GET_SEARCH_BLOGS_NEXT_FAIL,
            payload: e.response.data
        });
    }
}


export const get_blog = (id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await axios.get(`${process.env.REACT_APP_URL}api/blog/${id}/`, config);
        dispatch({
            type: GET_BLOG_SUCCESS,
            payload: response.data
        });
    } catch (e) {
        dispatch({
            type: GET_BLOG_FAIL,
            payload: e.response.data
        });
    }
}
