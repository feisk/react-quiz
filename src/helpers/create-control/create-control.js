const CreateControl = (config, validation) => ({
    ...config,
    validation,
    valid: !validation,
    touched: false,
    value: '',
});

export { CreateControl };