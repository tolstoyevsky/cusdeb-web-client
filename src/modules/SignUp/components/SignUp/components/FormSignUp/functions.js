export const validSignUpForm = formData => {
    let validState = false, validFields = {}, msg = "";

    for (let field in formData) {
        validFields[field] = !!formData[field];

        if (!formData[field])
            validState = true;
    }

    if (formData.password !== formData.retypePassword) {
        msg = "Passwords don't match";
        validFields.password = false;
        validFields.retypePassword = false;
    }

    if (msg || validState)
        return {
            status: false,
            invalidFields: validFields,
            msg: msg,
        };

    return {
        status: true,
    };
};
