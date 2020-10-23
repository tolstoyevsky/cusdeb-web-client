import { createAction } from "redux-actions";

import { FETCH_USER, FETCH_USER_FAILED, FETCH_USER_SUCCEEDED } from "../constants/app";

export const fetchUser = createAction(FETCH_USER);

export const fetchUserFailed = createAction(FETCH_USER_FAILED);

export const fetchUserSucceeded = createAction(
    FETCH_USER_SUCCEEDED,
    (user) => user,
);
