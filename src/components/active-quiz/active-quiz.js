import React from 'react';
import classes from './style.module.scss';

const ActiveQuiz = props => (
      <div className={classes.root}>
          <p className={classes.question}>
              <span>
                  <strong>2.</strong>
                  &nbsp;Text text?
              </span>
              <small>4 из 12</small>
          </p>

          <ul>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
          </ul>
      </div>
);

export { ActiveQuiz };