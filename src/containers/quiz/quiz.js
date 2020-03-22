import React from 'react';
import classes from './style.module.scss';
import { ActiveQuiz, FinishedQuiz } from '../../components';

class Quiz extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isFinished: false,
            activeQuestion: 0,
            answerState: null,
            results: {},
            quiz: [
                {
                    id: 1,
                    question: 'Какого цвета небо?',
                    rightAnswerId: 2,
                    answers: [
                        {
                            id: 1,
                            text: 'Черный'
                        },
                        {
                            id: 2,
                            text: 'Синий'
                        },
                        {
                            id: 3,
                            text: 'Красный'
                        },
                        {
                            id: 4,
                            text: 'Зеленый'
                        }
                    ]
                },
                {
                    id: 2,
                    question: 'Когда был основан Санкт-Петербург?',
                    rightAnswerId: 3,
                    answers: [
                        {
                            id: 1,
                            text: '1700'
                        },
                        {
                            id: 2,
                            text: '1702'
                        },
                        {
                            id: 3,
                            text: '1703'
                        },
                        {
                            id: 4,
                            text: '1803'
                        }
                    ]
                },
                {
                    id: 3,
                    question: 'В каком году началось ВОВ?',
                    rightAnswerId: 3,
                    answers: [
                        {
                            id: 1,
                            text: '1939'
                        },
                        {
                            id: 2,
                            text: '1940'
                        },
                        {
                            id: 3,
                            text: '1941'
                        },
                        {
                            id: 4,
                            text: '1942'
                        }
                    ]
                }
            ]
        };
    };

    render() {
        const {
            isFinished,
            activeQuestion,
            answerState,
            results,
            quiz
        } = this.state;

        console.log('Quiz props', this.props);

        const questionNumber = activeQuestion + 1;
        const quizLength = quiz.length;

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
            }, 500);
        };

        const handleRetryClick = () => {
            this.setState( {
                isFinished: false,
                activeQuestion: 0,
                answerState: null,
                results: {},
            });
        };

        return (
          <div className={classes.root}>
              <div>
                  <h1>Ответьте на все вопросы</h1>
                  { isFinished ?
                      <FinishedQuiz
                          quiz={quiz}
                          results={results}
                          quizLength={quizLength}
                          handleClick={handleRetryClick}
                      />
                  :
                      <ActiveQuiz
                          quiz={quiz[activeQuestion]}
                          quizLength={quizLength}
                          answerState={answerState}
                          questionNumber={questionNumber}
                          handleClick={handleAnswerClick}
                      />
                  }
              </div>
          </div>
        )
    }
}

export { Quiz };