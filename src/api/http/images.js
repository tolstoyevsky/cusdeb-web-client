import fetch from "utils/fetch";

// There is a default export.
export const listDevice = async () => (
    fetch.get("/init/list_devices/")
);
