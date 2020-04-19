import React from 'react';
import classes from './style.module.scss';
import axios from '../../axios';
import { ActiveQuiz, FinishedQuiz } from '../../components';
import { Loader } from "../../components/ui/loader";

class Quiz extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isFinished: false,
            activeQuestion: 0,
            answerState: null,
            results: {},
            quiz: []
        };
    };

    async componentDidMount() {
        const { match: { params: { id } }} = this.props;

        try {
            await axios.get(`quizes/${id}.json`).then(({data: quiz}) => {
                this.setState({quiz});
            });
        } catch (e) {
            console.error(e);
        }
    }

    render() {
        const {
            isFinished,
            activeQuestion,
            answerState,
            results,
            quiz
        } = this.state;

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
                  {quizLength ? (
                      <>
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
                      </>
                  ) : <Loader />}
              </div>
          </div>
        )
    }
}

export { Quiz };