import React from 'react';
import { connect } from 'react-redux';
import classes from './style.module.scss';
import { ActiveQuiz, FinishedQuiz } from '../../components';
import { Loader } from "../../components/ui/loader";
import { fetchQuizById } from "../../redux/actions";

class Quiz extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isFinished: false,
            activeQuestion: 0,
            answerState: null,
            results: {},
            quiz: [],
            loading: false
        };
    };

    componentDidMount() {
        const { onFetchQuizById, match: { params: { id } }} = this.props;

        onFetchQuizById(id);
    }

    render() {
        const {
            isFinished,
            activeQuestion,
            answerState,
            results,
        } = this.state;

        const { quiz, loading, error } = this.props;

        const questionNumber = activeQuestion + 1;
        const quizLength = quiz && quiz.length;

        const isQuizFinished = () => questionNumber === quizLength;

        const handleAnswerClick = id => {
            if (answerState && answerState[id] === 'success') return;

            const { rightAnswerId } = quiz[activeQuestion];

            if (id !== rightAnswerId) {
                this.setState(prevState => ({
                    answerState: {[id]: 'error'},
                    results: !prevState.results[activeQuestion] ? {
                        ...prevState.results,
                        [activeQuestion]: 'error'
                    } : { ...prevState.results },
                }));
                return;
            }

            this.setState(prevState => ({
                answerState: {[id]: 'success'},
                results: !prevState.results[activeQuestion] ? {
                    ...prevState.results,
                    [activeQuestion]: 'success'
                } : { ...prevState.results },
            }));

            const timeout = window.setTimeout(() => {
                if (isQuizFinished()) {
                    this.setState({
                        isFinished: true,
                    });
                } else {
                    this.setState(prevState => ({
                        activeQuestion: prevState.activeQuestion + 1,
                        answerState: null
                    }));
                }
                window.clearTimeout(timeout);
            }, 350);
        };

        const handleRetryClick = () => {
            this.setState( {
                isFinished: false,
                activeQuestion: 0,
                answerState: null,
                results: {},
            });
        };

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
                                  handleClick={handleRetryClick}
                              /> :
                              <ActiveQuiz
                                  quiz={quiz[activeQuestion]}
                                  quizLength={quizLength}
                                  answerState={answerState}
                                  questionNumber={questionNumber}
                                  handleClick={handleAnswerClick}
                              />
                          }
                      </>
                  )}
              </div>
          </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { quiz: { quiz, results, activeQuestion, answerState, isFinished, loading } } = state;

    return {
        quiz,
        results,
        activeQuestion,
        answerState,
        isFinished,
        loading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchQuizById: id => dispatch(fetchQuizById(id))
    }
};

const ConnectedQuiz = connect
(mapStateToProps, mapDispatchToProps)(Quiz);

export {Quiz, ConnectedQuiz};