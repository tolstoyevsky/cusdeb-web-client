export const validSignInForm = formData => {
    let validState = false, validFields = {};

    for (let field in formData) {
        validFields[field] = !!formData[field];

        if (!formData[field])
            validState = true;
    }

    if (validState)
        return {
            status: false,
            invalidFields: validFields,
        };


    return {
        status: true,
    };
};
