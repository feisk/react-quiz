import { combineReducers } from 'redux'

import { quiz, quizList } from './';


const reducers = combineReducers({
    quiz,
    quizList
});

export { reducers };
