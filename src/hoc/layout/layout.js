import React from 'react';
import PropTypes from 'prop-types';
import classes from './style.module.scss';

const Layout = props => {

    const { Header, children } = props;

    return (
        <div className={classes.layout}>
            {Header}
            <main className={classes.main}>
                {children}
            </main>
        </div>
    )
};

Layout.propTypes = {
    Header: PropTypes.node,
    children: PropTypes.node
};

Layout.defaultProps = {
    Header: null,
    children: null
};

export { Layout };