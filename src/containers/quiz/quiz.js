import React from 'react';
import classes from './style.module.scss';
import { ActiveQuiz } from '../../components/active-quiz';

class Quiz extends React.Component {
    state = {
        quiz: [
            {
                answers: [
                    {
                        text: 1
                    },
                    {
                        text: 2
                    },
                    {
                        text: 3
                    }
                ]
            }
        ]
    };

    render() {
        const { quiz } = this.state;

        return (
          <div className={classes.root}>
              <div className={classes.inner}>
                  <h1 className={classes.title}>Quiz</h1>

                  <ActiveQuiz answers={quiz[0].answers} />
              </div>
          </div>
        )
    }
}

export { Quiz };