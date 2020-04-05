import React from 'react';
import classes from './style.module.scss';
import { Button, Input, Select } from '../../components/ui';
import { createControl, validateControl, validateForm } from '../../helpers';

const variantsMap = [ 1, 2, 3, 4 ];

const createVariants = counts => (
    counts.map(count => ({
        [`variant${count}`]: createControl({
        id: count,
        label: `Вариант ${count}`,
        errorMessage: 'Значение не может быть пустым',
        }, {required: true})
    }))
);

const createControls = () => ({
    question: createControl({
        label: 'Введите вопрос',
        errorMessage: 'Вопрос не может быть пустым',
    },{required: true }),
    ...Object.assign({}, ...createVariants(variantsMap))
});

const QuizCreator = () => {
    const initialControls = createControls();
    const initialRightAnswerId = 1;

    const [ quiz, setQuiz ] = React.useState([]);
    const [ rightAnswerId, setRightAnswerId ] = React.useState(initialRightAnswerId);
    const [ controls, setControls ] = React.useState(initialControls);
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

    const renderSelect = () => (
        <Select
            name="select"
            label="Выберите правильный ответ"
            value={rightAnswerId}
            fullWidth
            onChange={event => handleSelectChange(event)}
            options={variantsMap.map(variant => ({
                text: variant,
                value: variant
            }))}
        />
    );

    const addQuestion = () => {
        const id = quiz.length + 1;
        const { question: { value: question } } = controls;

        const answers = variantsMap.map(count => {
            const { id, value: text } = controls[`variant${count}`];

            return { id, text };
        });

        setQuiz(prevState => [
            ...prevState,
            {
                id,
                question,
                rightAnswerId,
                answers: [ ...answers ]
            }
        ]);

        setControls(initialControls);
        setRightAnswerId(initialRightAnswerId);
    };

    const createQuiz = () => {

    };

    const handleSelectChange = event => {
        const value = +event.target.value;
        setRightAnswerId(value);
    };

    const handleChange = (event, name) => {
        const value = event.target.value;

        setControls(prevControls => {
            const valid = validateControl(value, prevControls[name].validation);

            return {
                ...prevControls,
                [name]: {
                    ...prevControls[name],
                    touched: true,
                    value,
                    valid
                }
            };
        });
    };

    return (
        <div className={classes.root}>
            <div>
                <h1>Создание теста</h1>

                <form onSubmit={e => e.preventDefault()}>
                    {renderControls()}
                    {renderSelect()}
                    <div>
                        <Button
                            type="primary"
                            disabled={!isFormValid}
                            onClick={addQuestion}
                        >
                            Добавить вопрос
                        </Button>

                        <Button
                            type="success"
                            disabled={!quiz.length}
                            onClick={createQuiz}
                        >
                            Создать тест
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export { QuizCreator };