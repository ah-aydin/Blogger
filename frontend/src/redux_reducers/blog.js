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
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAIL
} from '../redux_actions/blog_types';

const initialState = {
    blog: null,
    blog_comments: {
        count: null,
        next: null,
        prev: null,
        results: []
    },
    search_blogs: {
        count: null,
        next: null,
        prev: null,
        results: []
    },
    change: 0,
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
            };
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
            };
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
            };
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
            };
        case GET_BLOG_COMMENTS_SUCCESS:
            return {
                ...state,
                blog_comments: payload,
                successes: ['Retrieved comments'],
                errors: []
            };
        case GET_BLOG_COMMENTS_FAIL:
            return {
                ...state,
                blog_comments: {
                    count: null,
                    next: null,
                    prev: null,
                    results: []
                },
                successes: [],
                errors: ['Failed to load comments']
            };
        case GET_BLOG_COMMENTS_NEXT_SUCCESS:
            return {
                ...state,
                blog_comments: {
                    count: payload.count,
                    next: payload.next,
                    prev: payload.prev,
                    results: [...state.blog_comments.results, ...payload.results]
                },
                successes: ['Retrieved more comments'],
                errors: []
            };
        case GET_BLOG_COMMENTS_NEXT_FAIL:
            return {
                ...state,
                blog_comments: {
                    count: null,
                    next: null,
                    prev: null,
                    results: []
                },
                successes: [],
                errors: ['Failed to load comments']
            };
        case POST_COMMENT_SUCCESS:
            return {
                ...state,
                change: state.change + 1
            };
        case DELETE_COMMENT_SUCCESS:
            return {
                ...state,
                change: state.change + 1
            };
        case DELETE_COMMENT_FAIL:
        case POST_COMMENT_FAIL:
        default:
            return state
    }
};