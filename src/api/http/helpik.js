import createFetch, { prepareBaseUrl } from "utils/fetch";
import { cusdebHelpikPrefix, cusdebHelpikUrl } from "../../../config/main"; // TODO: resolve path to config

const fetch = createFetch({
    baseURL: prepareBaseUrl(cusdebHelpikUrl, cusdebHelpikPrefix),
});

export const fetchHelpikData = async (pageName, languageName, section = null) => (
    fetch.get("/get_synopsis", {
        params: {
            pageName,
            language: languageName,
            section,
        },
    })
);
