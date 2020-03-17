import React from 'react';
import PropTypes from 'prop-types';
import classes from './style.module.scss';

class Layout extends React.Component {

    render() {
        const { header, children } = this.props;

        return (
            <div className={classes.layout}>
                {header}
                <main className={classes.main}>
                    {children}
                </main>
            </div>
        )
    }
}

Layout.propTypes = {
    header: PropTypes.node,
    children: PropTypes.node
};

Layout.defaultProps = {
    header: null,
    children: null
};

export { Layout };