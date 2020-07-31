import createFetch from "utils/fetch";
import { cusdebApiPrefix, cusdebApiUrl, mode } from "../../../config/main"; // TODO: resolve path to config

const fetch = createFetch({
    baseURL: cusdebApiUrl && mode === "production" ? cusdebApiUrl : cusdebApiPrefix,
    createInterceptors: true,
});

// There is a default export.
export const listDevice = async () => (
    fetch.get("/init/list_devices/")
);
