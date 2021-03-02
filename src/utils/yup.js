export const validate = (schema, values) => {
    const fieldErrors = {};

    try {
        schema.validateSync(values, { abortEarly: false });
    } catch (validateErrors) {
        validateErrors.inner.forEach((error) => {
            fieldErrors[error.path] = error.message;
        });
    }

    return fieldErrors;
};
