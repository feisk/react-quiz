import React from 'react';
import { NavLink } from "react-router-dom";
import classes from './style.module.scss';
import axios from '../../axios';
import { Loader } from '../../components/ui';

const QuizList = () => {

    const [quizList, setQuizList] = React.useState([]);

    const getQuizList = async () => {
        try {
            await axios.get('quizes.json').then(({data}) => {
                const quizList = data && Object.keys(data).map((key, index) => ({
                        id: key,
                        name: `Тест № ${index + 1}`
                    })
                );
                setQuizList(quizList);
            });
        } catch(e) {
            console.error(e);
        }
    };

    React.useEffect(() => {
        getQuizList();
    }, []);

    return (
        <div className={classes.root}>
            <div>
                <h1>Список тестов</h1>

                {quizList && quizList.length ?
                    <ul>
                        {quizList.map(({id, name}) => {
                            return (
                                <li key={id}>
                                    <NavLink className={classes.link} to={`/quiz/${id}`}>
                                        {name}
                                    </NavLink>
                                </li>
                            )
                        })}
                    </ul> : <Loader />}
            </div>
        </div>
    );
};

export { QuizList };