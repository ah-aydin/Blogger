import axios from 'axios';
import {
    GET_SEARCH_BLOGS_SUCCESS,
    GET_SEARCH_BLOGS_FAIL,
    GET_SEARCH_BLOGS_NEXT_SUCCESS,
    GET_SEARCH_BLOGS_NEXT_FAIL,
    GET_BLOG_SUCCESS,
    GET_BLOG_FAIL,
    GET_BLOG_COMMENTS_SUCCESS,
    GET_BLOG_COMMENTS_FAIL,
    GET_BLOG_COMMENTS_NEXT_SUCCESS,
    GET_BLOG_COMMENTS_NEXT_FAIL,
    POST_COMMENT_SUCCESS,
    POST_COMMENT_FAIL,
    DELETE_COMMENT_FAIL,
    DELETE_COMMENT_SUCCESS
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
            payload: e.response
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
            payload: e.response
        });
    }
}

/**
 * Make a GET request to the backend for retrieving a blog with the
 * given id.
 * @param id Id of the blog that is going to be retrieved
 */
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
            payload: e
        });
    }
}

/**
 * Get the comments of the blog from the supplied url
 * @param url The url to make the request
 */
export const get_blog_comments = (url) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await axios.get(`${url}`, config);
        dispatch({
            type: GET_BLOG_COMMENTS_SUCCESS,
            payload: response.data
        });
    } catch (e) {
        dispatch ({
            type: GET_BLOG_COMMENTS_FAIL,
            payload: e.response
        });
    }
}

/**
 * Get the next set of comments
 * @param url The url to make the request
 */
export const get_blog_comments_next = (url) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await axios.get(`${url}`, config);
        dispatch({
            type: GET_BLOG_COMMENTS_NEXT_SUCCESS,
            payload: response.data
        });
    } catch (e) {
        dispatch ({
            type: GET_BLOG_COMMENTS_NEXT_FAIL,
            payload: e.response
        });
    }
}

/**
 * Posts a comment that contains the provided text that belongs to the blog with
 * the provided id
 * @param blog_id Id of the blog 
 * @param comment_body Comment's content
 */
export const post_comment = (blog_id, comment_body) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access')}`,
            'Content-Type': 'application/json'
        }
    };

    const body = {
        'body': comment_body
    };

    try {
        const response = await axios.post(`${process.env.REACT_APP_URL}api/blog/${blog_id}/comments/`, body, config);

        dispatch({
            type: POST_COMMENT_SUCCESS,
            payload: response.data
        });
    } catch (e) {
        dispatch({
            type: POST_COMMENT_FAIL,
            payload: e.response
        });
    }
}

/**
 * Deletes a commend with the given id if the user is the owner
 * @param comment_id Id of the comment
 */
export const delete_comment = (comment_id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access')}`,
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await axios.delete(`${process.env.REACT_APP_URL}api/blog/comment/${comment_id}/`, config);
        dispatch({
            type: DELETE_COMMENT_SUCCESS,
            payload: response.data
        })
    } catch (e) {
        dispatch({
            type: DELETE_COMMENT_FAIL,
            payload: e.response
        })
    }
}
