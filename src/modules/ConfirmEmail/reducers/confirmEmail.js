import { handleActions } from "redux-actions";

import { CONFIRM_EMAIL_REQUEST_FAILED, CONFIRM_EMAIL_REQUEST_SUCCEEDED } from "../constants/confirmEmail";

const defaultState = {
    tokenIsFetching: true,
    tokenStatus: false,
};

export default handleActions(
    {
        [CONFIRM_EMAIL_REQUEST_FAILED]: (state) => ({
            ...state,
            tokenIsFetching: false,
        }),
        [CONFIRM_EMAIL_REQUEST_SUCCEEDED]: (state) => ({
            ...state,
            tokenStatus: true,
            tokenIsFetching: false,
        }),
    },
    defaultState,
);
