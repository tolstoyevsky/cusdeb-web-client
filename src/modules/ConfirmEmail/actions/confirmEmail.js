import { createAction } from "redux-actions";

import {
    CONFIRM_EMAIL_REQUEST,
    CONFIRM_EMAIL_REQUEST_FAILED,
    CONFIRM_EMAIL_REQUEST_SUCCEEDED,
} from "../constants/confirmEmail";

export const confirmEmailRequest = createAction(CONFIRM_EMAIL_REQUEST);

export const confirmEmailRequestFailed = createAction(CONFIRM_EMAIL_REQUEST_FAILED);

export const confirmEmailRequestSucceeded = createAction(CONFIRM_EMAIL_REQUEST_SUCCEEDED);
