import dotenv from "dotenv";

dotenv.config();

export const DEBOUNCE_TIMEOUT = 600;

export const port = process.env.PORT || 8000;
export const host = process.env.HOST || "0.0.0.0";

export const mode = process.env.MODE || "development";

export const cusdebAnonymousPrefix = "/anonymous";
export const cusdebApiPrefix = "/api/v1";
export const cusdebHelpikPrefix = "/helpik_api";
export const cusdebTzPrefix = "/tz";

export const blackmagicUrl = process.env.BLACKMAGIC_URL || "ws://localhost:8002/bm/token/%token";

export const buildResultUrl = process.env.BUILD_RESULT_URL || "http://localhost:8008";

export const dominionUrl = process.env.DOMINION_URL || "ws://localhost:8003/dominion/token/%token";

export const cusdebAnonymousUrl = process.env.CUSDEB_ANONYMOUS_URL || "http://localhost:8007";

export const cusdebApiUrl = process.env.CUSDEB_API_URL || "http://localhost:8001";

export const cusdebHelpikUrl = process.env.CUSDEB_HELPIK_URL || "http://localhost:8005";

export const cusdebTzURL = process.env.CUSDEB_TZ_URL || "http://localhost:8006";

export const gisUrl = process.env.GIS_URL || "ws://localhost:8011/gis/token/%token";

export const sentryDSN = process.env.SENTRY_DSN;
