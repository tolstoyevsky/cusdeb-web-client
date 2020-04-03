import createFetch, { prepareBaseUrl } from "utils/fetch";
import { cusdebApiPrefix, cusdebApiUrl } from "../../../config/main"; // TODO: resolve path to config

const fetch = createFetch({
    baseURL: prepareBaseUrl(cusdebApiUrl, cusdebApiPrefix),
});

const authFetch = createFetch({
    baseURL: prepareBaseUrl(cusdebApiUrl, cusdebApiPrefix),
    createInterceptors: true,
});

// There is a default export.
export const listDevice = async () => (
    fetch.get("/init/list_devices/")
);

export const listImages = async () => (
    authFetch.get("/images/all/")
);

export const deleteImage = async (imageId) => (
    authFetch.delete("/images/delete", {
        data: {
            image_id: imageId,
        },
    })
);

export const updateImageNotes = async (imageId, imageNotes) => (
    authFetch.put("/images/update_notes/", {
        image_id: imageId,
        notes: imageNotes,
    })
);
