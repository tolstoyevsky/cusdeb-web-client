import axios from "axios";

import { getToken } from "utils/localStorage";
import { cusdebAPIURL } from "config/main";

/* eslint no-param-reassign: "error" */

const createResponseInterceptor = (instance) => {
    const interceptor = instance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response.status !== 401) {
                return Promise.reject(error);
            }

            instance.interceptors.response.eject(interceptor);

            const refreshToken = getToken("refreshToken") || localStorage.getItem("socialRefreshToken");
            if (refreshToken) {
                return instance.post("/auth/token/refresh/", {
                    refresh: refreshToken,
                }).then((response) => {
                    localStorage.setItem(
                        getToken("refreshToken") ? "accessToken" : "socialAccessToken",
                        response.data.access,
                    );
                    error.response.config.headers.Authorization = `Bearer ${response.data.access}`;

                    return instance(error.response.config);
                }).catch((refreshError) => {
                    localStorage.clear();

                    return Promise.reject(refreshError);
                });
            }
            return Promise.reject(error);
        },
    );
};

const createRequestInterceptor = (instance) => {
    instance.interceptors.request.use((config) => {
        const accessToken = getToken("accessToken") || localStorage.getItem("socialAccessToken");
        if (accessToken) {
            config.headers = { Authorization: `Bearer ${accessToken}` };
        }
        return config;
    });
};

const fetch = (() => {
    const instance = axios.create({
        baseURL: cusdebAPIURL,
    });

    createRequestInterceptor(instance);
    if (
        getToken("accessToken") || getToken("refreshToken")
        || localStorage.getItem("socialAccessToken") || localStorage.getItem("socialRefreshToken")
    ) {
        createResponseInterceptor(instance);
    }
    return instance;
})();

export default fetch;
