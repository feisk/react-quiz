import React from 'react';
import classes from './style.module.scss';
import { ActiveQuiz } from '../../components/active-quiz';

class Quiz extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeQuestion: 0,
            answerState: null,
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
        const { activeQuestion, answerState, quiz } = this.state;
        const questionNumber = activeQuestion + 1;
        const quizLength = quiz.length;

        const isQuizFinished = () => questionNumber === quizLength;

        const handleAnswerClick = id => {
            const { rightAnswerId } = quiz[activeQuestion];

            if (id !== rightAnswerId) {
                this.setState({
                    answerState: {[id]: 'error'}
                });
                return;
            }

            this.setState({
                answerState: {[id]: 'success'}
            });

            const timeout = window.setTimeout(() => {
                if (isQuizFinished()) {
                    console.log('You are finished!');
                } else {
                    this.setState(prevState => ({
                        activeQuestion: prevState.activeQuestion + 1,
                        answerState: null
                    }));
                }
                window.clearTimeout(timeout);
            }, 500);
        };

        return (
          <div className={classes.root}>
              <div className={classes.inner}>
                  <h1 className={classes.title}>Ответьте на все вопросы</h1>
                  <ActiveQuiz
                      quiz={quiz[activeQuestion]}
                      quizLength={quizLength}
                      answerState={answerState}
                      questionNumber={questionNumber}
                      handleClick={handleAnswerClick}
                  />
              </div>
          </div>
        )
    }
}

export { Quiz };