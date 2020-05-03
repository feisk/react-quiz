import React from 'react';
import { connect } from 'react-redux';
import classes from './style.module.scss';
import { ActiveQuiz, FinishedQuiz } from '../../components';
import { Loader } from "../../components/ui/loader";
import { fetchQuizById, handleAnswerClick, handleRetryClick } from "../../redux/actions";

class Quiz extends React.Component {
    constructor(props) { //  WHY IT THERE?
        super(props); //  WHY IT THERE?
    };

    componentDidMount() {
        const { onFetchQuizById, match: { params: { id } }} = this.props;

        onFetchQuizById(id);
    }

    render() {
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
            onRetryClick
        } = this.props;

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
                                  handleClick={onRetryClick}
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
    }
}

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
        onFetchQuizById: id => dispatch(fetchQuizById(id)),
        onAnswerClick: id => dispatch(handleAnswerClick(id)),
        onRetryClick: () => dispatch(handleRetryClick())
    }
};

const ConnectedQuiz = connect
(mapStateToProps, mapDispatchToProps)(Quiz);

export {Quiz, ConnectedQuiz};