import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";
import classes from './style.module.scss';
import { Loader } from '../../components/ui';
import { fetchQuizes } from '../../redux/actions'

const QuizList = props => {
    const { onFetchQuizes, quizList, loading, error } = props;

    React.useEffect(() => {
        onFetchQuizes();
    }, []);

    if (error) return (
        <p>{error.message ? error.message : 'Ошибка сервера'}</p>
    );

    const isRenderQuizList = !error && !loading;

    return (
        <div className={classes.root}>
            <div>
                <h1>Список тестов</h1>

                {error && <p>{error.message ? error.message : 'Ошибка загрузки данных'}</p>}
                {loading && <Loader />}
                {isRenderQuizList && (
                    quizList.length ?
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
                        </ul>
                    : <p>Тесты отсутствуют</p>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    const { quiz: { quizList, loading, error} } = state;

    return {
        quizList,
        loading,
        error,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchQuizes: () => dispatch(fetchQuizes())
    }
};

const ConnectedQuizList = connect
(mapStateToProps, mapDispatchToProps)(QuizList);

export {QuizList, ConnectedQuizList};