import createFetch from "utils/fetch";
import { cusdebHelpikPrefix, cusdebHelpikUrl, mode } from "../../../config/main"; // TODO: resolve path to config

const fetch = createFetch({
    baseURL: cusdebHelpikUrl && mode === "production" ? cusdebHelpikUrl : cusdebHelpikPrefix,
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
