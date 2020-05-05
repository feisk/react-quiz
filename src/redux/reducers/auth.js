import { AUTH_LOGOUT, AUTH_SUCCESS } from "../actions/actionTypes";

const initialState = {
    token: null
};

const auth = (state = initialState, action) => {
    switch(action.type) {
        case AUTH_LOGOUT:
            return {
                ...initialState
            };
        case AUTH_SUCCESS:
            return {
                ...state,
                token: action.token
            };
        default:
            return state
    }
};

export { auth };