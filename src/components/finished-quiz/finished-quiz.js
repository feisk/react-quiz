import React from 'react';
import classes from './style.module.scss';

const FinishedQuiz = props => {
    const { results, quiz } = props;

    return (
        <div
            className={classes.root}
        >
            <ul className={classes.list}>
                {quiz.map((el, index) => {
                    const cls = [
                        classes.item,
                        classes[results[index]]
                    ];

                    console.log('results[el]', results[index]);

                    return (
                        <li
                            key={index}
                            className={cls.join(' ')}
                        >
                            <strong>{index + 1}</strong>.&nbsp;
                            {el.question}
                        </li>
                    );
                })}
            </ul>
            <p>Правильно 4 из 10</p>
            <button>Повторить</button>
        </div>
    )
};

export { FinishedQuiz };