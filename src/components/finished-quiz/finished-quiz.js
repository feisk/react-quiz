import React from 'react';
import { Link } from "react-router-dom";
import classes from './style.module.scss';
import { Button } from '../ui';

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
            <Button
                variant="primary"
                onClick={handleClick}
            >
                Повторить
            </Button>
            <Link to="/">
                <Button
                    variant="success"
                    onClick={handleClick}
                >
                    К списку тестов
                </Button>
            </Link>
        </div>
    )
};

export { FinishedQuiz };