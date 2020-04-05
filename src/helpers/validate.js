import is from "is_js";

const validateControl = (value, validation) => {
    if (!validation) return true;

    const trimValue = value.trim();
    let isValid = true;

    if (validation.required) {
        isValid = trimValue.length !== 0;
    }

    if (validation.minLength) {
        isValid = value.length >= validation.minLength && isValid;
    }

    if (validation.email) {
        isValid = is.email(value) && isValid;
    }

    return isValid;
};

const validateForm = controls => (
    Object.keys(controls).every(name =>
        controls[name].valid)
);

export { validateControl, validateForm };