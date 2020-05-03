import { ADD_QUIZ_QUESTION, RESET_QUIZ } from "../actions/actionTypes";

const initialState = {
    quiz: []
};
const createQuiz = (state = initialState, action) => {
    switch (action.type) {
        case ADD_QUIZ_QUESTION:
            return {
                quiz: [
                    ...state.quiz,
                    action.question
                ]
            };
        case RESET_QUIZ:
            return {
                ...initialState
            };
        default:
            return state
    }
};

export  { createQuiz };