import { handleActions } from "redux-actions";

import {
    TOGGLE_NOTES_SUCCEEDED_MESSAGE,
} from "../constants/image";

const defaultState = {
    showNotesSucceededMessage: false,
};

export default handleActions(
    {
        [TOGGLE_NOTES_SUCCEEDED_MESSAGE]: (state, { payload: isShow }) => ({
            ...state,
            showNotesSucceededMessage: isShow,
        }),
    },
    defaultState,
);
