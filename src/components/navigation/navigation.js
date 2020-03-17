import React from 'react';
import classes from './style.module.scss';

const Navigation = props => {
    const { links, show } = props;

    const cls = [classes.root];

    if (show) cls.push(classes.show);

    return (
        <nav className={cls.join(' ')}>
            {links.map((link, index) => (
                <a
                    key={index}
                    href={`/${link}`}
                    className={classes.link}
                    title={link}
                    onClick={e => e.preventDefault()}
                >
                    {index}.&nbsp;{link}
                </a>
            ))}
        </nav>
    );
};

export { Navigation };