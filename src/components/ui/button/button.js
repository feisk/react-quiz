import React from 'react';
import classes from './style.module.scss';

const Button = props => {
    const {type, customClasses, children, onClick, disabled } = props;

    const cls = [classes.root];

    type && cls.push(classes[type]);
    disabled && cls.push(classes.disabled);
    customClasses && customClasses.map(el => el && cls.push(classes[el]));

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