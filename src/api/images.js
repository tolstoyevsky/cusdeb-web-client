import fetch from "utils/fetch";

export const listDevice = async () => (
    await fetch.get('/init/list_devices/')
)
