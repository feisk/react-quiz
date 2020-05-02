import { FETCH_QUIZ_LIST_START, FETCH_QUIZ_LIST_SUCCESS, FETCH_QUIZ_LIST_ERROR } from "../actions/actionTypes";

const initialState = {
    list: null,
    error: false,
    loading: false,
};

const quizList = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_QUIZ_LIST_START:
            return {
                ...state,
                loading: true
            };
        case FETCH_QUIZ_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                list: action.list
            };
        case FETCH_QUIZ_LIST_ERROR:
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
