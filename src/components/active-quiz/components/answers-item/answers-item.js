import React from 'react';
import classes from './style.module.scss';

const AnswersItem = props => {
    const { answer: { text } } = props;

    return (<li className={classes.root}>{text}</li>);
};

 export { AnswersItem };