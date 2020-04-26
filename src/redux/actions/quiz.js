import axios from '../../axios';
import { FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZES_ERROR } from "./actionTypes";

const fetchQuizesStart = () => {
    return {
        type: FETCH_QUIZES_START,
    }
};

const fetchQuizesSuccess = list => {
    return {
        type: FETCH_QUIZES_SUCCESS,
        list
    }
};

const fetchQuizesError = error => {
    return {
        type: FETCH_QUIZES_ERROR,
        error
    }
};

const fetchQuizes = () => {
    return async dispatch => {
        try {
            dispatch(fetchQuizesStart());
            await axios.get('quizes.json').then(({data}) => {
                const quizList = data && Object.keys(data).map((key, index) => ({
                        id: key,
                        name: `Тест № ${index + 1}`
                    })
                );

                dispatch(fetchQuizesSuccess(quizList))
            });
        } catch(error) {
            dispatch(fetchQuizesError(error.message))
        }
    }
};

export { fetchQuizes };
