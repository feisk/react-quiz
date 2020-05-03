import {
    FETCH_QUIZ_START,
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZ_ERROR,
    SET_QUIZ_ANSWER_RESULTS,
    SET_QUIZ_ACTIVE_QUESTION,
    FINISH_QUIZ,
    RETRY_QUIZ
} from "../actions/actionTypes";

const initialState = {
    quiz: null,
    results: {},
    quizLength: 0,
    activeQuestionIndex: 0,
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
                quiz: action.quiz,
                quizLength: action.quizLength
            };
        case FETCH_QUIZ_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case SET_QUIZ_ANSWER_RESULTS:
            return {
                ...state,
                answerState: action.answerState,
                results: action.results
            };
        case SET_QUIZ_ACTIVE_QUESTION:
            return {
                ...state,
                activeQuestionIndex: action.activeQuestionIndex,
                answerState: action.answerState,
            };
        case FINISH_QUIZ:
            return {
                ...state,
                isFinished: true
            };
        case RETRY_QUIZ:
            return {
                ...initialState,
                quiz: state.quiz,
                quizLength: state.quizLength
            };
        default:
            return state
    }
};

export { quiz };
