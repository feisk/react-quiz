import { FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZES_ERROR } from "../actions/actionTypes";

const initialState = {
    list: [],
    error: false,
    loading: false,
};

const quizList = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_QUIZES_START:
            return {
                ...state,
                loading: true
            };
        case FETCH_QUIZES_SUCCESS:
            return {
                ...state,
                loading: false,
                list: action.list
            };
        case FETCH_QUIZES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state
    }
};

export { quizList };
