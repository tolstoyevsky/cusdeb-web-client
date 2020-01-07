import fetch from "utils/fetch";

export const whoAmI = async () => (
    await fetch.get('/users/whoami/')
);

export const signIn = async formData => (
    await fetch.post('/auth/token/', formData)
);

export const signUp = async formData => (
    await fetch.post('/auth/signup/', formData)
);
