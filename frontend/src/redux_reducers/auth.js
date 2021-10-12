import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATE_SUCCESS,
    ACTIVATE_FAIL,
    LOGOUT
} from '../redux_actions/auth_types';

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: false,
    user: null,
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
            }
        case SIGNUP_FAIL:
            return {
                ...state,
                successes: [],
                errors: formatErrors(payload)
            }
        case ACTIVATE_SUCCESS:
            return {
                ...state,
                successes: ['Account activated succesfully']
            }
        case ACTIVATE_FAIL:
            return {
                ...state,
                errors: formatErrors(payload),
                successes: []
            }
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
        default:
            return state
    }
};