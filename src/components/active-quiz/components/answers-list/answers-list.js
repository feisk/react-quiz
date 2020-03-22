import React from 'react';

import { AnswersItem } from "..";

const AnswersList = props => {
    const { answers, answerState, handleClick } = props;

    return (
        <ul>
            {answers.map((answer, index) => (
                <AnswersItem
                    key={index}
                    answer={answer}
                    handleClick={handleClick}
                    answerState={answerState}
                />
            ))}
        </ul>
    );
};

 export { AnswersList };