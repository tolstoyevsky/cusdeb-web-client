import createFetch from "utils/fetch";
import { cusdebTzPrefix, cusdebTzURL, mode } from "../../../config/main"; // TODO: resolve path to config

const fetch = createFetch({
    baseURL: cusdebTzURL && mode === "production" ? cusdebTzURL : cusdebTzPrefix,
});

export const fetchTZData = async () => (
    fetch.get("/list_time_zones")
);
