import React from 'react';
import { connect } from "react-redux";
import { Route, Switch, Redirect } from 'react-router-dom'
import { Layout } from './hoc';
import {
    ConnectedAuth,
    ConnectedHeader,
    ConnectedLogout,
    ConnectedQuiz,
    ConnectedQuizCreator,
    ConnectedQuizList
} from './containers';
import { autoLogin } from "./redux/actions";

const App = props => {
    const { isAuth, autoLogin } = props;

    React.useEffect(() => {
        autoLogin()
    }, []);

    return (
        <Layout
            header={<ConnectedHeader/>}
        >
            <Switch>
                {isAuth
                    ? <Route path="/logout" component={ConnectedLogout}/>
                    : <Route path="/auth" component={ConnectedAuth}/>
                }
                {isAuth && <Route path="/quiz-creator" component={ConnectedQuizCreator}/>}
                <Route path="/quiz/:id" component={ConnectedQuiz}/>
                <Route path="/" exact component={ConnectedQuizList}/>
                <Redirect to="/" />
            </Switch>
        </Layout>
    );
};

const mapStateToProps = state => {
    const { auth } = state;

    return {
        isAuth: !!auth.token
    }
};

const mapDispatchToProps = dispatch => {
    return {
        autoLogin: () => dispatch(autoLogin())
    }
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export {ConnectedApp};
