import axios from "axios";
import url from "url";

import { mode } from "../../config/main"; // TODO: resolve path to config

/* eslint no-param-reassign: "error" */

const createResponseInterceptor = (instance) => {
    const interceptor = instance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response.status !== 401) {
                return Promise.reject(error);
            }

            instance.interceptors.response.eject(interceptor);

            const refreshToken = localStorage.getItem("refreshToken") || localStorage.getItem("socialRefreshToken");
            if (refreshToken) {
                return instance.post("/auth/token/refresh/", {
                    refresh: refreshToken,
                }).then((response) => {
                    localStorage.setItem(
                        localStorage.getItem("refreshToken") ? "accessToken" : "socialAccessToken",
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
        const accessToken = localStorage.getItem("accessToken") || localStorage.getItem("socialAccessToken");
        if (accessToken) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${accessToken}`,
            };
        }
        return config;
    });
};

const createFetch = ({ baseURL, createInterceptors = false }) => {
    const baseConfig = { baseURL };
    const instance = axios.create(baseConfig);

    if (createInterceptors) {
        createRequestInterceptor(instance);
        if (
            localStorage.getItem("accessToken") || localStorage.getItem("refreshToken")
            || localStorage.getItem("socialAccessToken") || localStorage.getItem("socialRefreshToken")
        ) {
            createResponseInterceptor(instance);
        }
    }

    return instance;
};

const prepareBaseUrl = (baseUrl, prefix) => (
    baseUrl && mode === "production" ? url.resolve(baseUrl, prefix) : prefix
);

export default createFetch;
export { prepareBaseUrl };
