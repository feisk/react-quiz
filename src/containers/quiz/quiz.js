import React from 'react';
import { connect } from 'react-redux';
import classes from './style.module.scss';
import { ActiveQuiz, FinishedQuiz } from '../../components';
import { Loader } from "../../components/ui/loader";
import { fetchQuizById, handleAnswerClick, retryQuiz } from "../../redux/actions";

const Quiz = props => {
    const {
        quiz,
        results,
        quizLength,
        activeQuestionIndex,
        answerState,
        isFinished,
        loading,
        error,
        onAnswerClick,
        onRetryQuiz
    } = props;

    React.useEffect(() => {
        const { fetchQuizById, match: { params: { id } }} = props;

        fetchQuizById(id);

        return onRetryQuiz;
    }, []);

    const isRenderQuiz = !error && !loading && quiz;

    return (
        <div className={classes.root}>
            <div>
                <h1>Ответьте на все вопросы</h1>
                {error && <p>{error.message ? error.message : 'Ошибка загрузки данных'}</p>}

                {loading && <Loader />}
                {isRenderQuiz && (
                    <>
                        {isFinished ?
                            <FinishedQuiz
                                quiz={quiz}
                                results={results}
                                quizLength={quizLength}
                                handleClick={onRetryQuiz}
                            /> :
                            <ActiveQuiz
                                quiz={quiz[activeQuestionIndex]}
                                quizLength={quizLength}
                                answerState={answerState}
                                questionNumber={activeQuestionIndex + 1}
                                handleClick={onAnswerClick}
                            />
                        }
                    </>
                )}
            </div>
        </div>
    )
};

const mapStateToProps = state => {
    const {
        quiz: {
            quiz,
            results,
            quizLength,
            activeQuestionIndex,
            answerState,
            isFinished,
            loading,
            error
        }
    } = state;

    return {
        quiz,
        results,
        quizLength,
        activeQuestionIndex,
        answerState,
        isFinished,
        loading,
        error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        onAnswerClick: id => dispatch(handleAnswerClick(id)),
        onRetryQuiz: () => dispatch(retryQuiz())
    }
};

const ConnectedQuiz = connect
(mapStateToProps, mapDispatchToProps)(Quiz);

export {Quiz, ConnectedQuiz};