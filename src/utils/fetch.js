import axios from "axios";

import { getToken } from "utils/localStorage";
import { backendURI } from "config/main";

/* eslint no-param-reassign: "error" */

const createResponseInterceptor = (instance) => {
    const interceptor = instance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response.status !== 401) {
                return Promise.reject(error);
            }

            instance.interceptors.response.eject(interceptor);

            if (getToken("refreshToken")) {
                return instance.post("/auth/token/refresh/", {
                    refresh: getToken("refreshToken"),
                }).then((response) => {
                    localStorage.setItem("accessToken", response.data.access);
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
        if (getToken("accessToken")) {
            config.headers = { Authorization: `Bearer ${getToken("accessToken")}` };
        }
        return config;
    });
};

const fetch = (() => {
    const instance = axios.create({
        baseURL: backendURI,
    });

    createRequestInterceptor(instance);
    if (getToken("accessToken") || getToken("refreshToken")) {
        createResponseInterceptor(instance);
    }
    return instance;
})();

export default fetch;
