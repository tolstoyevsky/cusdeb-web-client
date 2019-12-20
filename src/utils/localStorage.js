export const setTokens = (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
}

export const getToken = (type) => ({
    'accessToken': localStorage.getItem('accessToken'),
    'refreshToken': localStorage.getItem('refreshToken'),
}[type]);
