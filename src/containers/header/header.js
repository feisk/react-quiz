import React from 'react';
import  { connect } from "react-redux";
import classes from './style.module.scss';
import { Navigation } from '../../components';
import { Button, Overlay } from "../../components/ui";

const Header = props => {
    const { isAuth } = props;

    const links = [
        {
            to: '/',
            label: 'Список',
            exact: true
        },
    ];

    if (isAuth) {
        links.push(
            {
                to: '/quiz-creator',
                label: 'Создать тест',
                exact: false
            },
            {
                to: '/logout',
                label: 'Выйти',
                exact: false
            }
        )
    } else {
        links.push(
            {
                to: '/auth',
                label: 'Авторизация',
                exact: false
            }
        )
    }

    const [ show, setShow ] = React.useState(false);

    const handleClick = () => setShow(prevState => !prevState);

    const cls = [classes.root];

    if (show) cls.push(classes.show);

    return (
        <header className={cls.join(' ')}>
            <Button
                variant="toggle"
                customClasses={[
                    show ? 'is-show' : '',
                ]}
                onClick={handleClick}
            />
            <div className={classes.inner}>
                <Navigation
                    show={show}
                    links={links}
                    onClick={handleClick}
                />
            </div>
            {show ? <Overlay onClick={handleClick} /> : null}
        </header>
    );
};

const mapStateToProps = state => {
    const { auth } = state;

    return {
        isAuth: !!auth.token
    }
};

const ConnectedHeader = connect(mapStateToProps)(Header);

export { ConnectedHeader };