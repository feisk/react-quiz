import axios from '../../axios';
import { FETCH_QUIZ_LIST_START, FETCH_QUIZ_LIST_SUCCESS, FETCH_QUIZ_LIST_ERROR } from "./actionTypes";

const fetchQuizListStart = () => {
    return {
        type: FETCH_QUIZ_LIST_START,
    }
};

const fetchQuizListSuccess = list => {
    return {
        type: FETCH_QUIZ_LIST_SUCCESS,
        list
    }
};

const fetchQuizListError = error => {
    return {
        type: FETCH_QUIZ_LIST_ERROR,
        error
    }
};

const fetchQuizList = () => {
    return async dispatch => {
        try {
            dispatch(fetchQuizListStart());
            await axios.get('quizes.json').then(({data}) => {
                const quizList = data && Object.keys(data).map((key, index) => ({
                        id: key,
                        name: `Тест № ${index + 1}`
                    })
                );

                dispatch(fetchQuizListSuccess(quizList))
            });
        } catch(error) {
            dispatch(fetchQuizListError(error.message))
        }
    }
};

export { fetchQuizList };
