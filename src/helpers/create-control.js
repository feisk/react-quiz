const createControl = (config, validation) => ({
    ...config,
    validation,
    valid: !validation,
    touched: false,
    value: '',
});

export { createControl };