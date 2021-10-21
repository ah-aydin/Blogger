import {
    GET_FEED_SUCCESS,
    GET_FEED_FAIL,
    GET_FEED_NEXT_SUCCESS,
    GET_FEED_NEXT_FAIL
} from '../redux_actions/feed_types';

const initialState = {
    feed_blogs: {
        count: null,
        next: null,
        prev: null,
        results: []
    }
};

export default function (state=initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case GET_FEED_SUCCESS:
            return {
                ...state,
                feed_blogs: {
                    count: payload.count,
                    next: payload.next,
                    prev: payload.prev,
                    results: payload.results
                },
                successes: ['Loaded feed blogs sucsessfully'],
                errors: []
            };
        case GET_FEED_FAIL:
            return {
                ...state,
                feed_blogs: {
                    count: null,
                    next: null,
                    prev: null,
                    results: [],
                    errors: ['Could not load in feed blogs'],
                    successes: []
                }
            };
        case GET_FEED_NEXT_SUCCESS:
            return {
                ...state,
                feed_blogs: {
                    count: payload.count,
                    next: payload.next,
                    prev: payload.prev,
                    results: [...state.feed_blogs.results, ...payload.results]
                },
                successes: ['Loaded search results sucsessfully for next page'],
                errors: []
            };
        case GET_FEED_NEXT_FAIL:
            return {
                ...state,
                feed_blogs: {
                    count: null,
                    next: null,
                    prev: null,
                    results: [],
                    errors: ['Could not load in blogs'],
                    successes: []
                }
            };
        default:
            return state
    }
};