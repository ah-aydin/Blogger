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
    errors: [ ]
};

const removeItems = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
};

export default function (state=initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case LOGIN_SUCCESS:
        case LOGIN_FAIL:
        case SIGNUP_SUCCESS:
        case SIGNUP_FAIL:
        case ACTIVATE_SUCCESS:
        case ACTIVATE_FAIL:
        case LOGOUT:
        default:
            return state
    }
};