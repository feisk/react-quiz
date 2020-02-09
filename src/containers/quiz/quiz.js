import React from 'react';
import classes from './style.module.scss';
import { ActiveQuiz } from '../../components/active-quiz';

class Quiz extends React.Component {
    state = {
        quiz: []
    };

    render() {

        return (
          <div className={classes.quiz}>
              <div className={classes.inner}>
                  <h1 className={classes.title}>Quiz</h1>

                  <ActiveQuiz />
              </div>
          </div>
        )
    }
}

export { Quiz };