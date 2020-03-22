import React from 'react';
import { NavLink } from "react-router-dom";
import classes from './style.module.scss';

const list = [1, 2, 3];

const QuizList = props => {

    return (
        <div className={classes.root}>
            <div>
                <h1>Список тестов</h1>
                <ul>
                    {list.map((el, index) => (
                        <li key={index}>
                            <NavLink className={classes.link} to={`/quiz/${el}`}>
                                Тест №{el}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export { QuizList };