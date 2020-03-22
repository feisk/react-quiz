import React from 'react';
import classes from './style.module.scss';

const Overlay = ({ onClick }) => (
    <div className={classes.root} onClick={onClick} />
);

export { Overlay };