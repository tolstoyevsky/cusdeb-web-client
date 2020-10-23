import { handleActions } from "redux-actions";

import { FETCH_USER_FAILED, FETCH_USER_SUCCEEDED } from "../constants/app";

const defaultState = {
    userIsFetching: true,
    user: null,
};

export default handleActions(
    {
        [FETCH_USER_FAILED]: (state) => ({
            ...state,
            userIsFetching: false,
        }),
        [FETCH_USER_SUCCEEDED]: (state, { payload: user }) => ({
            ...state,
            user,
            userIsFetching: false,
        }),
    },
    defaultState,
);
