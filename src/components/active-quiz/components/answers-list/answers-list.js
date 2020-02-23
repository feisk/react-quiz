import React from 'react';
import classes from './style.module.scss';

import { AnswersItem } from "..";

const AnswersList = props => {
    const { answers } = props;

    return (
        <ul className={classes.root}>
            {answers.map((answer, index) => (
                <AnswersItem
                    key={index}
                    answer={answer}
                />
            ))}
        </ul>
    );
};

 export { AnswersList };