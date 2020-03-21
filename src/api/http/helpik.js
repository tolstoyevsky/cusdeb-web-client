import axios from "axios";
import { helpikURL } from "config/main";

export const fetchHelpikData = async (pageName, languageName) => (
    axios.get(`${helpikURL}/get_synopsis/`, {
        params: {
            pageName,
            language: languageName,
        },
    })
);
