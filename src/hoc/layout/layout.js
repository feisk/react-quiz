import React from 'react';
import PropTypes from 'prop-types';
import classes from './style.module.scss';

const Layout = props => {

    const { header, children } = props;

    return (
        <div className={classes.layout}>
            {header}
            <main className={classes.main}>
                {children}
            </main>
        </div>
    )
};

Layout.propTypes = {
    header: PropTypes.node,
    children: PropTypes.node
};

Layout.defaultProps = {
    header: null,
    children: null
};

export { Layout };