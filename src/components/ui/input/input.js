import React from 'react';
import PropTypes from 'prop-types';
import classes from "./style.module.scss";

const isInvalid = (valid, touched, shouldValidate) =>
    !valid && touched && shouldValidate;

const Input = props => {
    const {
        type,
        name,
        fullWidth,
        label,
        value,
        valid,
        touched,
        shouldValidate,
        errorMessage,
        onChange
    } = props;

    const error = isInvalid(valid, touched, shouldValidate);

    const id = `${label}-${(Math.random() * 100).toFixed(5)}`;
    const cls = [classes.root];

    fullWidth && cls.push(classes.fullWidth);
    error && cls.push(classes.error);

    return (
        <div className={cls.join(' ')}>
            <label htmlFor={id}>
                {label}
            </label>
            <input
                id={id}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
            />
            {error && errorMessage && <span>{errorMessage || 'error'}</span>}
        </div>
    );
};

Input.propTypes = {
    type: PropTypes.string,
};

Input.defaultProps = {
    type: 'text',
};

export { Input };