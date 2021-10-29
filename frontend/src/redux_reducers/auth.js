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
} from '../redux_actions/auth_types';

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: false,
    user: null,
    followers: {
        count: null,
        next: null,
        prev: null,
        results: []
    },
    blogs: {
        count: null,
        next: null,
        prev: null,
        results: []
    },
    errors: [ ],
    successes: [ ]
};

const formatErrors = (errors) => {
    let formatData = [ ];
    for (const error in errors) {
        formatData.push(errors[error])
    }
    return formatData;
}


const removeItems = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('user');
};

export default function (state=initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access);
            localStorage.setItem('refresh', payload.refresh);
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh,
                errors: [],
                successes: ['Authenticated succesfully']
            };
        case LOGIN_FAIL:
            removeItems();
            return {
                ...state,
                isAuthenticated: false,
                access: '',
                refresh: '',
                errors: formatErrors(payload),
                successes: []
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                successes: ['An activation email has been sent.']
            };
        case SIGNUP_FAIL:
            return {
                ...state,
                successes: [],
                errors: formatErrors(payload)
            };
        case ACTIVATE_SUCCESS:
            return {
                ...state,
                successes: ['Account activated succesfully']
            };
        case ACTIVATE_FAIL:
            return {
                ...state,
                errors: formatErrors(payload),
                successes: []
            };
        case LOGOUT:
            removeItems();
            return {
                ...state,
                isAuthenticated: false,
                access: '',
                refresh: '',
                errors: [],
                successes: ['Logged out succesfully']
            };
        case USER_LOAD_SUCCESS:
            localStorage.setItem("user", payload);
            return {
                ...state,
                user: payload
            };
        case USER_LOAD_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                successes: [ ]
            };
        case CHANGE_USER_DATA_SUCCESS:
            return {
                ...state,
                successes: ['Changed user information']
            };
        case CHANGE_USER_DATA_FAIL:
            return {
                ...state,
                errors: ['Could not change user data']
            };
        case GET_USER_FOLLOWERS_SUCCESS:
            return {
                ...state,
                followers: payload
            };
        case GET_USER_FOLLOWERS_FAIL:
            return {
                ...state,
                followers: {
                    count: null,
                    next: null,
                    prev: null,
                    results: []
                },
                successes: [],
                errors: ['Failed to load followers']
            };
        case GET_USER_FOLLOWERS_NEXT_SUCCESS:
            return {
                ...state,
                followers: {
                    count: payload.count,
                    next: payload.next,
                    prev: payload.prev,
                    results: [...state.followers.results, ...payload.results]
                }
            };
        case GET_USER_FOLLOWERS_NEXT_FAIL:
            return {
                ...state,
                followers: {
                    count: null,
                    next: null,
                    prev: null,
                    results: []
                },
                successes: [],
                errors: ['Failed to load followers']
            };
        case GET_USER_BLOGS_SUCCESS:
            return {
                ...state,
                blogs: payload
            };
        case GET_USER_BLOGS_FAIL:
            return {
                ...state,
                blogs: {
                    count: null,
                    next: null,
                    prev: null,
                    results: []
                },
                successes: [],
                errors: ['Failed to load blogs']
            };
        case GET_USER_BLOGS_NEXT_SUCCESS:
            return {
                ...state,
                blogs: {
                    count: payload.count,
                    next: payload.next,
                    prev: payload.prev,
                    results: [...state.blogs.results, ...payload.results]
                }
            };
        case GET_USER_BLOGS_NEXT_FAIL:
            return {
                ...state,
                blogs: {
                    count: null,
                    next: null,
                    prev: null,
                    results: []
                },
                successes: [],
                errors: ['Failed to load followers']
            };
        case 'ERROR':
            return {
                ...state,
                errors: payload
            };
        default:
            return state
    }
};