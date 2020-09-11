import createFetch, { prepareBaseUrl } from "utils/fetch";
import { cusdebTzPrefix, cusdebTzURL } from "../../../config/main"; // TODO: resolve path to config

const fetch = createFetch({
    baseURL: prepareBaseUrl(cusdebTzURL, cusdebTzPrefix),
});

export const fetchTZData = async () => (
    fetch.get("/list_time_zones")
);
