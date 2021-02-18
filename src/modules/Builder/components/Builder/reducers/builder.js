import { handleActions } from "redux-actions";

import { UPDATE_BUILD_STAGE_AVAILABLE } from "../constants/builder";

const defaultState = {
    buildStageAvailable: true,
};

export default handleActions(
    {
        [UPDATE_BUILD_STAGE_AVAILABLE]: (state, { payload: buildStageAvailable }) => ({
            ...state,
            buildStageAvailable,
        }),
    },
    defaultState,
);
