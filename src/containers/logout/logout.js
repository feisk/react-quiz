import React from 'react';
import  { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { logout } from "../../redux/actions";

const Logout = props => {
    const { logout } = props;

    React.useEffect(() => {
        logout();
    }, []);

    return (
        <Redirect to="/" />
    );
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
    }
};

const ConnectedLogout = connect(null, mapDispatchToProps)(Logout);

export { ConnectedLogout };