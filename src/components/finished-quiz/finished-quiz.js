import React from 'react';
import classes from './style.module.scss';

const FinishedQuiz = props => {
    const { results, quizLength, quiz, handleClick } = props;

    const successCount = Object.keys(results).reduce((total, key) => {
        if (results[key] === 'success') total++;
        return total;
    }, 0);

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
            <p>Правильно {successCount} из {quizLength}</p>
            <button
                onClick={handleClick}
            >
                Повторить
            </button>
        </div>
    )
};

export { FinishedQuiz };