import dotenv from "dotenv";

dotenv.config();

export const port = process.env.PORT || 8000;
export const host = process.env.HOST || "0.0.0.0";

export const mode = process.env.MODE || "development";

export const cusdebAnonymousPrefix = "/anonymous";
export const cusdebApiPrefix = "/api/v1";
export const cusdebHelpikPrefix = "/helpik_api";
export const cusdebTzPrefix = "/tz";

export const blackmagicUrl = process.env.BLACKMAGIC_URL;
if (!blackmagicUrl) {
    throw new Error("The Black Magic RPC server address is not specified.");
}
export const dominionUrl = process.env.DOMINION_URL;
if (!dominionUrl) {
    throw new Error("The Dominion RPC server address is not specified.");
}

export const cusdebAnonymousUrl = process.env.CUSDEB_ANONYMOUS_URL;
if (!cusdebAnonymousUrl) {
    throw new Error("The CusDeb Anonymous server address is not specified.");
}
export const cusdebApiUrl = process.env.CUSDEB_API_URL;
if (!cusdebApiUrl) {
    throw new Error("The CusDeb API server address is not specified.");
}
export const cusdebHelpikUrl = process.env.CUSDEB_HELPIK_URL;
if (!cusdebHelpikUrl) {
    throw new Error("The CusDeb Helpik server address is not specified.");
}
export const cusdebTzURL = process.env.CUSDEB_TZ_URL;
if (!cusdebTzURL) {
    throw new Error("The CusDeb TZ server address is not specified.");
}
