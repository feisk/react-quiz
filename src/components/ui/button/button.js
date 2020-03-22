import React from 'react';
import classes from './style.module.scss';

const Button = props => {
    const {type, customClasses, children, onClick, disabled } = props;

    const cls = [classes.root];

    if (type) cls.push(classes[type]);
    if (customClasses) customClasses.map(el => el && cls.push(classes[el]));

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