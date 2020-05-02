import axios from '../../axios';
import { FETCH_QUIZ_START, FETCH_QUIZ_SUCCESS, FETCH_QUIZ_ERROR } from "./actionTypes";

const fetchQuizStart = () => {
    return {
        type: FETCH_QUIZ_START,
    }
};

const fetchQuizSuccess = quiz => {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
};

const fetchQuizError = error => {
    return {
        type: FETCH_QUIZ_ERROR,
        error
    }
};

const fetchQuizById = quizId => {
    return async dispatch => {
        try {
            dispatch(fetchQuizStart());
            await axios.get(`quizes/${quizId}.json`).then(({data: quiz}) => {
                dispatch(fetchQuizSuccess(quiz))
            });
        } catch (error) {
            dispatch(fetchQuizError(error.message))
        }
    }
};

export { fetchQuizById };