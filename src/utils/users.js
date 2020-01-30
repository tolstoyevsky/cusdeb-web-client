import { resetTokens } from "utils/localStorage";

export const signOut = () => {
    resetTokens();
    window.location.reload();
};
