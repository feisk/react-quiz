import { FETCH_QUIZ_START, FETCH_QUIZ_SUCCESS, FETCH_QUIZ_ERROR } from "../actions/actionTypes";

const initialState = {
    quiz: null,
    results: {},
    activeQuestion: 0,
    answerState: null,
    isFinished: false,
    loading: false,
    error: false
};

const quiz = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_QUIZ_START:
            return {
                ...state,
                loading: true
            };
        case FETCH_QUIZ_SUCCESS:
            return {
                ...state,
                loading: false,
                quiz: action.quiz
            };
        case FETCH_QUIZ_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state
    }
};

export { quiz };
