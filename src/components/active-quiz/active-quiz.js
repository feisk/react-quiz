import React from 'react';
import classes from './style.module.scss';

import { AnswersList } from './components';

const ActiveQuiz = props => {
    const { answers } = props;

    return (
        <div className={classes.root}>
            <p className={classes.question}>
              <span>
                  <strong>2.</strong>
                  &nbsp;Text text?
              </span>
                <small>4 из 12</small>
            </p>
            <AnswersList answers={answers} />
        </div>
    )
};

export { ActiveQuiz };