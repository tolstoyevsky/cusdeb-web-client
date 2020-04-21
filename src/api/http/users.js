import fetch from "utils/fetch";

export const whoAmI = async () => (
    fetch.get("/users/whoami/")
);

export const signIn = async (formData) => (
    fetch.post("/auth/token/", formData)
);

export const signUp = async (formData) => (
    fetch.post("/auth/signup/", formData)
);

export const socialSignIn = async () => (
    fetch.get("/social/token/")
);

export const passwordReset = async (useremail) => (
    fetch.post("/users/password_reset/", { email: useremail })
);

export const passwordResetConfirm = async (newPassword, token) => (
    fetch.post("/users/password_reset/confirm/", { password: newPassword, token })
);

export const passwordValidateToken = async (token) => (
    fetch.post("/users/password_reset/validate_token/", { token })
);
