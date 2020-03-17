import React from 'react';
import classes from './style.module.scss';

const Button = props => {
    const {type,  children, onClick, disabled } = props;

    const cls = [
        classes.root,
        classes[type]
    ];

    return (
      <button
          type={type}
          className={cls.join(' ')}
          onClick={onClick}
          disabled={disabled}
      >
          {children}
      </button>
    );
};

export { Button };