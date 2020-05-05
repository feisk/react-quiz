import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './style.module.scss';

const Navigation = props => {
    const { links, onClick } = props;

    return (
        <nav className={classes.root}>
            {links.map((link, index) => (
                <NavLink
                    key={index}
                    to={link.to}
                    exact={link.exact}
                    className={classes.link}
                    activeClassName={classes.active}
                    title={link.label}
                    onClick={onClick}
                >
                    {link.label}
                </NavLink>
            ))}
        </nav>
    );
};

export { Navigation };