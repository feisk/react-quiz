import React from 'react';
import { connect } from "react-redux";
import classes from './style.module.scss';
import { Button, Input, Select } from '../../components/ui';
import { createControl, validateControl, validateForm } from '../../helpers';
import { addQuizQuestion, createQuiz } from '../../redux/actions'

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

const QuizCreator = props => {
    const initialControls = createControls();
    const initialRightAnswerId = 1;

    const { quiz, onAddQuizQuestion, onCreateQuiz } = props;

    const [ rightAnswerId, setRightAnswerId ] = React.useState(initialRightAnswerId);
    const [ controls, setControls ] = React.useState(initialControls);
    const [ isFormValid, setFormValid ] = React.useState(true);

    React.useEffect(() => {
        setFormValid(validateForm(controls));
    }, [controls]);

    React.useEffect(() => {
        setControls(initialControls);
        setRightAnswerId(initialRightAnswerId);
    }, [quiz]);

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

    const handleAddQuestion = () => {
        const id = quiz.length + 1;
        const { question: { value: question } } = controls;

        const answers = variantsMap.map(count => {
            const { id, value: text } = controls[`variant${count}`];

            return { id, text };
        });

        const quizQuestion = {
            id,
            question,
            rightAnswerId,
            answers: [ ...answers ]
        };

        onAddQuizQuestion(quizQuestion);
    };

    const handleCreateQuiz = () => {
        onCreateQuiz(quiz);
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

    const handleSubmit = e => {
        e.preventDefault();
    };

    return (
        <div className={classes.root}>
            <div>
                <h1>Создание теста</h1>

                <form onSubmit={handleSubmit}>
                    {renderControls()}
                    {renderSelect()}
                    <div>
                        <Button
                            variant="primary"
                            disabled={!isFormValid}
                            onClick={handleAddQuestion}
                        >
                            Добавить вопрос
                        </Button>

                        <Button
                            variant="success"
                            disabled={!quiz.length}
                            onClick={handleCreateQuiz}
                        >
                            Создать тест
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    const { createQuiz: { quiz } } = state;

    return {
        quiz
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddQuizQuestion: question => dispatch(addQuizQuestion(question)),
        onCreateQuiz: quiz => dispatch(createQuiz(quiz))
    }
};

const ConnectedQuizCreator = connect
(mapStateToProps, mapDispatchToProps)(QuizCreator);


export { QuizCreator, ConnectedQuizCreator };