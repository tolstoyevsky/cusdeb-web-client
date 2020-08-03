export const signOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("socialAccessToken");
    localStorage.removeItem("socialRefreshToken");

    window.location.reload();
};
