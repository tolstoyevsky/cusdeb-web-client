import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { reactI18nextModule } from "react-i18next";

import commonRU from "../../public/locales/ru/common.json";

const resources = {
    ru: {
        common: commonRU,
    },
};

i18n
    .use(LanguageDetector)
    .use(reactI18nextModule)
    .init({
        resources,
        fallbackLng: "en",

        detection: {
            order: ["path", "navigator"],
        },

        keySeparator: false,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
