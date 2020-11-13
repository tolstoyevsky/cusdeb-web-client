import axios from "axios";
import url from "url";
import {
    checkTokens,
    clearTokens,
    getAccessToken,
    getRefreshToken,
    setAccessToken,
} from "./token";

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

            const refreshToken = getRefreshToken();
            if (refreshToken) {
                return instance.post("/auth/token/refresh/", {
                    refresh: refreshToken,
                }).then((response) => {
                    setAccessToken(response.data.access);
                    error.response.config.headers.Authorization = `Bearer ${response.data.access}`;

                    return instance(error.response.config);
                }).catch((refreshError) => {
                    clearTokens();
                    return Promise.reject(refreshError);
                });
            }
            return Promise.reject(error);
        },
    );
};

const createRequestInterceptor = (instance) => {
    instance.interceptors.request.use((config) => {
        const accessToken = getAccessToken();
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
        if (checkTokens()) {
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
