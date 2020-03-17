import React from 'react';
import classes from './style.module.scss';
import { Navigation } from '../../components';
import { Button, Overlay } from "../../components/ui";

const links = [1, 2, 3];

const Header = () => {
    const [ show, setShow ] = React.useState(false);

    const handleClick = () => setShow(prevState => !prevState);

    const cls = [classes.root];

    if (show) cls.push(classes.show);

    return (
        <header className={cls.join(' ')}>
            <Button type="toggle" onClick={handleClick} />
            <Navigation show={show} links={links} />
            {show ? <Overlay onClick={handleClick} /> : null}
        </header>
    );
};

export { Header };