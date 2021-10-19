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
} from '../redux_actions/account_types';

const initialState = {
    account: null,
    account_blogs: {
        count: null,
        next: null,
        prev: null,
        results: []
    },
    account_followers: {
        count: null,
        next: null,
        prev: null,
        results: []
    },
    search_accounts: {
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
        case GET_SEARCH_ACCOUNTS_SUCCESS:
            return {
                ...state,
                search_accounts: {
                    count: payload.count,
                    next: payload.next,
                    prev: payload.prev,
                    results: payload.results
                },
                successes: ['Loaded search results sucsessfully'],
                errors: []
            };
        case GET_SEARCH_ACCOUNTS_FAIL:
            return {
                ...state,
                search_accounts: {
                    count: null,
                    next: null,
                    prev: null,
                    results: [],
                    errors: ['Could not load in accounts'],
                    successes: []
                }
            };
        case GET_SEARCH_ACCOUNTS_NEXT_SUCCESS:
            return {
                ...state,
                search_accounts: {
                    count: payload.count,
                    next: payload.next,
                    prev: payload.prev,
                    results: [...state.search_accounts.results, ...payload.results]
                },
                successes: ['Loaded search results sucsessfully for next page'],
                errors: []
            };
        case GET_SEARCH_ACCOUNTS_NEXT_FAIL:
            return {
                ...state,
                search_accounts: {
                    count: null,
                    next: null,
                    prev: null,
                    results: [],
                    errors: ['Could not load in accounts'],
                    successes: []
                }
            };
        case GET_ACCOUNT_SUCCESS:
            return {
                ...state,
                account: payload,
                successes: [],
                errors: []
            };
        case GET_ACCOUNT_FAIL:
            return {
                ...state,
                account: null,
                successes: [],
                errors: ['Failed to retrive the blog with the given ID.']
            };
        case GET_ACCOUNT_BLOGS_SUCCESS:
            return {
                ...state,
                account_blogs: payload,
                successes: ['Retrieved blogs'],
                errors: []
            };
        case GET_ACCOUNT_BLOGS_FAIL:
            return {
                ...state,
                account_blogs: {
                    count: null,
                    next: null,
                    prev: null,
                    results: []
                },
                successes: [],
                errors: ['Failed to load blogs']
            };
        case GET_ACCOUNT_BLOGS_NEXT_SUCCESS:
            return {
                ...state,
                account_blogs: {
                    count: payload.count,
                    next: payload.next,
                    prev: payload.prev,
                    results: [...state.account_blogs.results, ...payload.results]
                },
                successes: ['Retrieved more blogs'],
                errors: []
            };
        case GET_ACCOUNT_BLOGS_NEXT_FAIL:
            return {
                ...state,
                account_blogs: {
                    count: null,
                    next: null,
                    prev: null,
                    results: []
                },
                successes: [],
                errors: ['Failed to load blogs']
            };    
        case GET_ACCOUNT_FOLLOWERS_SUCCESS:
            return {
                ...state,
                account_followers: payload,
                successes: ['Retrieved followers'],
                errors: []
            };
        case GET_ACCOUNT_FOLLOWERS_FAIL:
            return {
                ...state,
                account_followers: {
                    count: null,
                    next: null,
                    prev: null,
                    results: []
                },
                successes: [],
                errors: ['Failed to load followers']
            };
        case GET_ACCOUNT_FOLLOWERS_NEXT_SUCCESS:
            return {
                ...state,
                account_followers: {
                    count: payload.count,
                    next: payload.next,
                    prev: payload.prev,
                    results: [...state.account_followers.results, ...payload.results]
                },
                successes: ['Retrieved more followers'],
                errors: []
            };
        case GET_ACCOUNT_FOLLOWERS_NEXT_FAIL:
            return {
                ...state,
                account_followers: {
                    count: null,
                    next: null,
                    prev: null,
                    results: []
                },
                successes: [],
                errors: ['Failed to load followers']
            };
        default:
            return state
    }
};