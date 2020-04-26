import React from 'react';
import { Route, Switch } from 'react-router-dom'
import  { Layout } from './hoc';
import  { ConnectedQuiz, ConnectedQuizList, QuizCreator, Header, Auth } from './containers';

const App = () => {
  return (
    <Layout
        header={<Header />}
    >
        <Switch>
            <Route path="/auth" component={Auth}/>
            <Route path="/quiz-creator" component={QuizCreator}/>
            <Route path="/quiz/:id" component={ConnectedQuiz}/>
            <Route path="/" component={ConnectedQuizList}/>
        </Switch>
    </Layout>
  );
};

export { App };
