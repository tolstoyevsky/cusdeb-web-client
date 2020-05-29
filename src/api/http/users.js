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
