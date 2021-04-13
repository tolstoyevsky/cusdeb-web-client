import { clearTokens } from "./token";

export const signOut = () => {
    clearTokens();

    window.location.replace("/");
};
