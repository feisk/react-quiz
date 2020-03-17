import React from 'react';
import classes from './style.module.scss';

const AnswersItem = props => {
    const {
        answer: { id, text },
        answerState,
        handleClick
    } = props;

    const cls = [
        classes.root,
    ];

    if (answerState && answerState[id]) cls.push(classes[answerState[id]]);

    const handleItemClick = () => handleClick(id);

    return (
        <li
            className={cls.join(' ')}
            onClick={handleItemClick}
        >
            {text}
        </li>
    );
};

 export { AnswersItem };