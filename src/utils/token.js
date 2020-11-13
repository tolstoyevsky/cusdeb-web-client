import Cookies from "js-cookie";

const expireTime = 365;

export const checkTokens = () => (
    Cookies.get("accessToken") || Cookies.get("refreshToken")
);

export const clearTokens = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
};

export const getAccessToken = () => (
    Cookies.get("accessToken")
);

export const getRefreshToken = () => (
    Cookies.get("refreshToken")
);

export const setAccessToken = (accessToken) => {
    Cookies.set("accessToken", accessToken, { expires: expireTime });
};

export const setRefreshToken = (refreshToken) => {
    Cookies.set("refreshToken", refreshToken, { expires: expireTime });
};

export const setTokens = (accessToken, refreshToken) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
};
