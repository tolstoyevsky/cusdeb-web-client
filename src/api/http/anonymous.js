import createFetch, { prepareBaseUrl } from "utils/fetch";
import { cusdebAnonymousPrefix, cusdebAnonymousUrl } from "../../../config/main"; // TODO: resolve path to config

const fetch = createFetch({
    baseURL: prepareBaseUrl(cusdebAnonymousUrl, cusdebAnonymousPrefix),
});

export const getToken = () => (
    fetch.get("/")
);
