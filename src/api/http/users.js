import createFetch, { prepareBaseUrl } from "utils/fetch";
import { cusdebApiPrefix, cusdebApiUrl } from "../../../config/main"; // TODO: resolve path to config

const fetch = createFetch({
    baseURL: prepareBaseUrl(cusdebApiUrl, cusdebApiPrefix),
    createInterceptors: true,
});

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

export const loginUpdate = async (username, email) => (
    fetch.post("/users/login_update", { username, email })
);

export const profileDelete = async (username, password) => (
    fetch.post("users/profile_delete", { username, password })
);

export const updatePassword = async (oldPassword, password, retypePassword) => (
    fetch.post("users/password_update", {
        old_password: oldPassword,
        password,
        retype_password: retypePassword,
    })
);
