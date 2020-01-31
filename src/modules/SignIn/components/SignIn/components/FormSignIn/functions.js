export const validSignInForm = (formData) => {
    const invalidFields = {};
    let validState = false;

    Object.keys(formData).forEach((field) => {
        invalidFields[field] = !!formData[field];

        if (!formData[field]) {
            validState = true;
        }
    });

    if (validState) {
        return {
            status: false,
            invalidFields,
        };
    }

    return {
        status: true,
    };
};
