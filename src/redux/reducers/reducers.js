import { combineReducers } from 'redux'

import { quiz, quizList, createQuiz, auth } from './';


const reducers = combineReducers({
    quiz,
    quizList,
    createQuiz,
    auth
});

export { reducers };
