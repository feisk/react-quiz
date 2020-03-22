import React from 'react';
import classes from './style.module.scss';

import { AnswersList } from './components';

const ActiveQuiz = props => {
    const {
        quiz: { question, answers },
        quizLength,
        answerState,
        questionNumber,
        handleClick
    } = props;

    return (
        <div className={classes.root}>
            <p className={classes.question}>
                {questionNumber}.&nbsp;{question}
                <small>{questionNumber} из {quizLength}</small>
            </p>
            <AnswersList
                answers={answers}
                handleClick={handleClick}
                answerState={answerState}
            />
        </div>
    )
};

export { ActiveQuiz };