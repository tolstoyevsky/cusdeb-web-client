import axios from "axios";

import { getToken } from "utils/localStorage"
import { backendURI } from 'config/main';

const createResponseInterceptor = instance => {
    const interceptor = instance.interceptors.response.use(
        response => response,
        error => {
            if (error.response.status !== 401)
                return Promise.reject(error);

            instance.interceptors.response.eject(interceptor);

            if (getToken('refreshToken')) {
                return instance.post('/auth/token/refresh/', {
                    refresh: getToken('refreshToken'),
                }).then(response => {
                    localStorage.setItem('accessToken', response.data.access);
                    error.response.config.headers['Authorization'] = `Bearer ${response.data.access}`;

                    return instance(error.response.config);
                }).catch(refreshError => {
                    localStorage.clear();

                    return Promise.reject(refreshError);
                });
            } else {
                return Promise.reject(error);
            }
        },
    );
};

const createRequestInterceptor = instance => {
    instance.interceptors.request.use(config => {
        if (getToken('accessToken'))
            config.headers = { 'Authorization': `Bearer ${getToken('accessToken')}` };

        return config;
    });
}

export default fetch = (() => {
    let instance = axios.create({
        baseURL: backendURI,
    });

    createRequestInterceptor(instance);
    if (getToken('accessToken') || getToken('refreshToken'))
        createResponseInterceptor(instance);

    return instance;
})();
