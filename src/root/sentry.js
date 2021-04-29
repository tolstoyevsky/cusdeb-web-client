import { mode, sentryDSN } from "../../config/main";

let Sentry;
let Integrations;
try {
    // eslint-disable-next-line global-require,import/no-extraneous-dependencies
    Sentry = require("@sentry/react");
    // eslint-disable-next-line global-require,import/no-extraneous-dependencies
    Integrations = require("@sentry/tracing").Integrations;
} catch (error) {
    // eslint-disable-next-line no-console
    console.warn(`Unable to initialize Sentry. ${error.message}.`);
}

export const init = () => {
    if (Sentry && Integrations && sentryDSN) {
        Sentry.init({
            dsn: sentryDSN,
            integrations: [
                new Integrations.BrowserTracing(),
            ],
            environment: mode,
            tracesSampleRate: mode === "production" ? 1 : 0,
        });
    }
};
