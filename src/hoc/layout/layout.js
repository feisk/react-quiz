import React from 'react';
import PropTypes from 'prop-types';
import classes from './style.module.scss';

class Layout extends React.Component {

    render() {
        const { children } = this.props;

        return (
            <div className={classes.layout}>
                <main className={classes.main}>
                    {children}
                </main>
            </div>
        )
    }
}

Layout.propTypes = {
    children: PropTypes.node
};

Layout.defaultProps = {
    children: null
};

export { Layout };