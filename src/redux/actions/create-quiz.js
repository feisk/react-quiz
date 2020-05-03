import axios from '../../axios';
import { ADD_QUIZ_QUESTION, RESET_QUIZ } from "./actionTypes";

const addQuizQuestion = question => {
    return {
        type: ADD_QUIZ_QUESTION,
        question
    }
};

const resetQuiz = () => {
    return {
        type: RESET_QUIZ
    }
};

const createQuiz = quiz => {
    return async dispatch => {
        try {
            await axios.post('quizes.json', quiz)
                .then(() => {
                    dispatch(resetQuiz())
                });
        } catch (e) {
            console.error(e);
        }
    }
};

export { addQuizQuestion, createQuiz };