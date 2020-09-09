import createFetch from "utils/fetch";
import { cusdebHelpikUrl } from "../../../config/main"; // TODO: resolve path to config

const fetch = createFetch({
    baseURL: cusdebHelpikUrl,
});

export const fetchHelpikData = async (pageName, languageName, section = null) => (
    fetch.get("/", {
        params: {
            page: pageName,
            lang: languageName,
            sec: section,
        },
    })
);
