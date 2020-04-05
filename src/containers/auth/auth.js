import React from 'react';
import is from 'is_js';
import classes from './style.module.scss';
import { Button, Input } from '../../components/ui'

const controlsData = {
    email: {
        value: '',
        label: 'email',
        errorMessage: 'Введите корректный email',
        valid: false,
        touched: false,
        validation: {
            required: true,
            email: true,
        }
    },
    password: {
        value: '',
        type: 'password',
        label: 'пароль',
        errorMessage: 'Введите корректный пароль',
        valid: false,
        touched: false,
        validation: {
            required: true,
            minLength: 6,
        }
    }
};

const validate = (value, validation) => {
    if (!validation) return true;

    let isValid = true;

    if (validation.required) {
        isValid = value.length !== 0;
    }

    if (validation.minLength) {
        isValid = value.length >= validation.minLength && isValid;
    }

    if (validation.email) {
        isValid = is.email(value) && isValid;
    }

    return isValid;
};

const Auth = () => {

    const [ controls, setControls ] = React.useState(controlsData);
    const [ isFormValid, setFormValid ] = React.useState(true);

    React.useEffect(() => {
        setFormValid(
            Object.keys(controls).every(name =>
                controls[name].valid)
        );
    }, [controls]);

    const renderControls = () => (
        Object.keys(controls).map((name, index) => {
            const input = controls[name];

            return (
                <Input
                    key={index}
                    name={name}
                    type={input.type}
                    value={input.value}
                    label={input.label}
                    valid={input.valid}
                    touched={input.touched}
                    errorMessage={input.errorMessage}
                    shouldValidate={!!input.validation}
                    onChange={event => handleChange(event, name)}
                    fullWidth
                />
            );
        })
    );

    const loginHandler = () => {

    };

    const registerHandler = () => {

    };

    const handleChange = (event, name) => {
        const value = event.target.value.replace(/\s+/g, '');

        setControls(prevControls => {
            const valid = validate(value, prevControls[name].validation);

            return {
                ...prevControls,
                [name]: {
                    ...prevControls[name],
                    touched: true,
                    value,
                    valid,
                }
            };
        });
    };

    return (
        <div className={classes.root}>
            <div>
                <h1>Авторизация</h1>

                <form
                    onSubmit={e => e.preventDefault()}
                >
                    {renderControls()}
                    <div>
                        <Button
                            type="success"
                            disabled={!isFormValid}
                            onClick={loginHandler}
                        >
                            Войти
                        </Button>
                        <Button
                            type="primary"
                            onClick={registerHandler}
                        >
                            Зарегистрироваться
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export { Auth };