import axios from '../../axios';
import {
    FETCH_QUIZ_START,
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZ_ERROR,
    SET_QUIZ_ANSWER_RESULTS,
    SET_QUIZ_ACTIVE_QUESTION,
    FINISH_QUIZ,
    RETRY_QUIZ
} from "./actionTypes";

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

const fetchQuizStart = () => {
    return {
        type: FETCH_QUIZ_START,
    }
};

const fetchQuizSuccess = (quiz) => {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz,
        quizLength: quiz.length
    }
};

const fetchQuizError = error => {
    return {
        type: FETCH_QUIZ_ERROR,
        error
    }
};

const setQuizAnswerResults = (answerState, results) => {
    return {
        type: SET_QUIZ_ANSWER_RESULTS,
        answerState,
        results
    }
};

const setQuizActiveQuestion = (activeQuestionIndex, answerState) => {
    return {
        type: SET_QUIZ_ACTIVE_QUESTION,
        activeQuestionIndex,
        answerState
    }
};

const handleAnswerClick = answerId => {
    return (dispatch, getState) => {
        const { quiz: { quiz, results, quizLength, activeQuestionIndex, answerState } } = getState();

        const { rightAnswerId } = quiz[activeQuestionIndex];

        if (answerState && answerState[rightAnswerId] === 'success') return;

        const answerStateValue = answerId === rightAnswerId ? 'success' : 'error';

        const isQuizFinished = activeQuestionIndex + 1 === quizLength;

        dispatch(setQuizAnswerResults(
            {[answerId]: answerStateValue},
            !results[activeQuestionIndex] ? {
                ...results,
                [activeQuestionIndex]: answerStateValue
            } : results
        ));

        if (answerStateValue === 'success') {
            const timeout = window.setTimeout(() => {
                if (isQuizFinished) {
                    dispatch(finishQuiz());
                } else {
                    dispatch(setQuizActiveQuestion(
                        activeQuestionIndex + 1,
                        null)
                    );
                }
                window.clearTimeout(timeout);
            }, 350);
        }
    }
};

const finishQuiz = () => {
    return {
        type: FINISH_QUIZ
    }
};

const handleRetryClick = () => {
    return dispatch => {
        dispatch(retryQuiz());
    }
};

const retryQuiz = () => {
    return {
        type: RETRY_QUIZ
    }
};

export { fetchQuizById, handleAnswerClick, handleRetryClick };