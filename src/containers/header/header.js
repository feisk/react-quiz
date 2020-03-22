import React from 'react';
import classes from './style.module.scss';
import { Navigation } from '../../components';
import { Button, Overlay } from "../../components/ui";

const links = [
    {
        to: '/',
        label: 'Список',
        exact: true
    },
    {
        to: '/auth',
        label: 'Авторизация',
        exact: false
    },
    {
        to: '/quiz-creator',
        label: 'Создать тест',
        exact: false
    }
];

const Header = () => {
    const [ show, setShow ] = React.useState(false);

    const handleClick = () => setShow(prevState => !prevState);

    const cls = [classes.root];

    if (show) cls.push(classes.show);

    return (
        <header className={cls.join(' ')}>
            <Button
                customClasses={[
                    'toggle',
                    show ? 'is-show' : '',
                ]}
                onClick={handleClick}
            />
            <Navigation
                show={show}
                links={links}
                onClick={handleClick}
            />
            {show ? <Overlay onClick={handleClick} /> : null}
        </header>
    );
};

export { Header };