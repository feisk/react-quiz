import React from 'react';
import classes from './style.module.scss';
import { Button, Input, Select } from '../../components/ui';
import { CreateControl } from '../../helpers/create-control';

const variantsMap = [ 1, 2, 3, 4 ];


const createControls = () => ({
    question: CreateControl({
        label: 'Введите вопрос',
        errorMessage: 'Вопрос не может быть пустым',
    },{required: true }),
    ...Object.assign({}, ...createVariants(variantsMap))
});

const createVariants = counts => (
    counts.map(count => ({
        [`variant${count}`]: CreateControl({
        id: count,
        label: `Вариант ${count}`,
        errorMessage: 'Значение не может быть пустым',
        }, {required: true})
    }))
);

const QuizCreator = () => {

    const [ quiz, setQuiz ] = React.useState([]);
    const [ rightAnswerId, setRightAnswerId ] = React.useState(1);
    const [ controls, setControls ] = React.useState(createControls());

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

    const renderSelect =() => (
        <Select
            name="select"
            value={rightAnswerId}
            fullWidth
            onChange={event => handleSelectChange(event)}
            options={variantsMap.map(variant => ({
                text: variant,
                value: variant
            }))}
        />
    );

    const handleSelectChange = event => {
        const value = event.target.value;
        setRightAnswerId(value);
    };

    const handleChange = (event, name) => {
        const value = event.target.value;

        setControls(prevControls => {
            // const valid = validate(value, prevControls[name].validation);
            const valid = true;

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

    const addQuestionHandler = () => {

    };

    const createQuizHandler = () => {

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
                            onClick={addQuestionHandler}
                        >
                            Добавить вопрос
                        </Button>

                        <Button
                            type="success"
                            onClick={createQuizHandler}
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