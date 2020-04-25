import axios from "axios";
import { cusdebHelpikURL } from "config/main";

export const fetchHelpikData = async (pageName, languageName, section = null) => (
    axios.get(`${cusdebHelpikURL}/get_synopsis/`, {
        params: {
            pageName,
            language: languageName,
            section,
        },
    })
);
