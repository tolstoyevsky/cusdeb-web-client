import createFetch from "utils/fetch";
import { cusdebApiPrefix, cusdebApiUrl, mode } from "../../../config/main"; // TODO: resolve path to config

const fetch = createFetch({
    baseURL: cusdebApiUrl && mode === "production" ? cusdebApiUrl : cusdebApiPrefix,
    createInterceptors: true,
});

export const emailVerification = async (token) => (
    fetch.post("/auth/email_verification/", { token })
);

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
