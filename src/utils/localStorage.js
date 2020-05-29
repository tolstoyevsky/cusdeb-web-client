export const setTokens = (accessToken, refreshToken) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
};

export const getToken = (type) => ({
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
}[type]);

export const resetTokens = () => {
    localStorage.setItem("accessToken", null);
    localStorage.setItem("refreshToken", null);
    localStorage.setItem("socialAccessToken", null);
    localStorage.setItem("socailRefreshToken", null);
};
