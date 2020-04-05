import React from 'react';
import classes from "./style.module.scss";

const Select = props => {
    const { name, label, value, options, onChange, fullWidth } = props;

    const id = `${label}-${(Math.random() * 100).toFixed(5)}`;
    const cls = [classes.root];

    fullWidth && cls.push(classes.fullWidth);

    return (
        <div className={cls.join(' ')}>
            <label htmlFor={id}>
                {label}
            </label>
            <select
                id={id}
                name={name}
                value={value}
                onChange={onChange}
            >
                {options.map((option, index) => (
                    <option
                        key={index}
                        value={option.value}
                    >
                        {option.text}
                    </option>
                ))};
            </select>
        </div>
    );
};

export { Select };