import createFetch, { prepareBaseUrl } from "utils/fetch";
import { cusdebApiPrefix, cusdebApiUrl } from "../../../config/main"; // TODO: resolve path to config

const fetch = createFetch({
    baseURL: prepareBaseUrl(cusdebApiUrl, cusdebApiPrefix),
});

// There is a default export.
export const listDevice = async () => (
    fetch.get("/init/list_devices/")
);
