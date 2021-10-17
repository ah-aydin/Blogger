import {
    GET_SEARCH_BLOGS_SUCCESS,
    GET_SEARCH_BLOGS_FAIL,
    GET_SEARCH_BLOGS_NEXT_SUCCESS,
    GET_SEARCH_BLOGS_NEXT_FAIL,

    GET_BLOG_SUCCESS,
    GET_BLOG_FAIL


} from '../redux_actions/blog_types';

const initialState = {
    blog: null,
    search_blogs: {
        count: null,
        next: null,
        prev: null,
        results: []
    },
    successes: [],
    errors: []
};

export default function (state=initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case GET_SEARCH_BLOGS_SUCCESS:
            return {
                ...state,
                search_blogs: {
                    count: payload.count,
                    next: payload.next,
                    prev: payload.prev,
                    results: payload.results
                },
                successes: ['Loaded search results sucsessfully'],
                errors: []
            };
        case GET_SEARCH_BLOGS_FAIL:
            return {
                ...state,
                search_blogs: {
                    count: null,
                    next: null,
                    prev: null,
                    results: [],
                    errors: ['Could not load in blogs'],
                    successes: []
                }
            }
        case GET_SEARCH_BLOGS_NEXT_SUCCESS:
            return {
                ...state,
                search_blogs: {
                    count: payload.count,
                    next: payload.next,
                    prev: payload.prev,
                    results: [...state.search_blogs.results, ...payload.results]
                },
                successes: ['Loaded search results sucsessfully for next page'],
                errors: []
            }
        case GET_SEARCH_BLOGS_NEXT_FAIL:
            return {
                ...state,
                search_blogs: {
                    count: null,
                    next: null,
                    prev: null,
                    results: [],
                    errors: ['Could not load in blogs'],
                    successes: []
                }
            }
        case GET_BLOG_SUCCESS:
            return {
                ...state,
                blog: payload,
                successes: [],
                errors: []
            };
        case GET_BLOG_FAIL:
            return {
                ...state,
                blog: null,
                successes: [],
                errors: ['Failed to retrive the blog with the given ID.']
            }
        default:
            return state
    }
};