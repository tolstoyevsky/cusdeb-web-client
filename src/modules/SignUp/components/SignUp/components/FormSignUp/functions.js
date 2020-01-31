export const validSignUpForm = (formData) => {
    const validFields = {};
    let validState = false;
    let msg = "";

    Object.keys(formData).forEach((field) => {
        validFields[field] = !!formData[field];

        if (!formData[field]) {
            validState = true;
        }
    });

    if (formData.password !== formData.retypePassword) {
        msg = "Passwords don't match";
        validFields.password = false;
        validFields.retypePassword = false;
    }

    if (msg || validState) {
        return {
            status: false,
            invalidFields: validFields,
            msg,
        };
    }

    return {
        status: true,
    };
};
