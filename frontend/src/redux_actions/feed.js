import axios from 'axios';
import {
    GET_FEED_SUCCESS,
    GET_FEED_FAIL,
    GET_FEED_NEXT_SUCCESS,
    GET_FEED_NEXT_FAIL
} from './feed_types';

/**
 * Retrieves the feed tab for the given user id
 * @param id Id of the user
 */
export const get_feed = (id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'applicatio/json'
        }
    };
    
    try {
        const response = await axios.get(`${process.env.REACT_APP_URL}api/blog/account/${id}/follow/?ordering=-date_created`, config);
        dispatch({
            type: GET_FEED_SUCCESS,
            payload: response.data
        });
    } catch (e) {
        dispatch({
            type: GET_FEED_FAIL,
            payload: e.response
        });
    }
}

/**
 * Retrieves the next feed tab given the url
 * @param ulr Points to the next page in REST api
 */
export const get_feed_next = (url) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'applicatio/json'
        }
    };

    try {
        const response = await axios.get(url, config);
        dispatch({
            type: GET_FEED_NEXT_SUCCESS,
            payload: response.data
        });
    } catch (e) {
        dispatch({
            type: GET_FEED_NEXT_FAIL,
            payload: e.response
        });
    }
}