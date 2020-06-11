export const signOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("socialAccessToken");
    localStorage.removeItem("socailRefreshToken");

    window.location.reload();
};
