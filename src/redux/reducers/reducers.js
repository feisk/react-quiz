import { combineReducers } from 'redux'

import { quiz, quizList, createQuiz } from './';


const reducers = combineReducers({
    quiz,
    quizList,
    createQuiz
});

export { reducers };
