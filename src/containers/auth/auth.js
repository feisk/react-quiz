import React from 'react';
import classes from './style.module.scss';
import { Button, Input } from '../../components/ui'
import { validateControl, validateForm } from '../../helpers';

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

const Auth = () => {

    const [ controls, setControls ] = React.useState(controlsData);
    const [ isFormValid, setFormValid ] = React.useState(true);

    React.useEffect(() => {
        setFormValid(validateForm(controls));
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

        setControls(prevState => {
            const valid = validateControl(value, prevState[name].validation);

            return {
                ...prevState,
                [name]: {
                    ...prevState[name],
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
                            variant="success"
                            disabled={!isFormValid}
                            onClick={loginHandler}
                        >
                            Войти
                        </Button>
                        <Button
                            variant="primary"
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