import axios from 'axios';
import { AUTH_LOGOUT, AUTH_SUCCESS } from "./actionTypes";

const auth = (email, password, isLogin) => {
    return async dispatch => {
        const authKey = 'AIzaSyBEf8HUO2zwaJbBkGiZ8lYMaEr0REvpBvY';
        const authType = isLogin ? 'signInWithPassword' : 'signUp';

        const url = `https://identitytoolkit.googleapis.com/v1/accounts:${authType}?key=${authKey}`;

        const authData = {
            email,
            password,
            returnSecureToken: true
        };

        try {
            await axios.post(url, authData)
                .then(response => {
                    const { data: { idToken, localId, expiresIn } } = response;

                    const expires = new Date(new Date().getTime() + expiresIn * 1000);

                    localStorage.setItem('token', idToken);
                    localStorage.setItem('userId', localId);
                    localStorage.setItem('expires', expires);

                    dispatch(authSuccess(idToken));
                    dispatch(autoLogout(expiresIn));
                });
        } catch(e) {
            console.error(e);
        }
    }
};

const autoLogin = () => {
    return  dispatch => {
        const token = localStorage.getItem('token');
        const expires = new Date(localStorage.getItem('expires'));

        if (!token || expires <= new Date) return dispatch(logout());

        dispatch(authSuccess(token));
        dispatch(autoLogout((expires.getTime() - new Date().getTime()) / 1000));
    }
};

const autoLogout = expires => {
    return dispatch => {
        setTimeout(() => {
            console.log('app logout');
            return dispatch(logout());
        }, expires * 1000);
    }
};

const authSuccess = token => {
    return {
        type: AUTH_SUCCESS,
        token
    }
};

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expires');
    return {
        type: AUTH_LOGOUT
    }
};

export { auth, logout, autoLogin };

