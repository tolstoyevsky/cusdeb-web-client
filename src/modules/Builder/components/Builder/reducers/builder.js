import { handleActions } from "redux-actions";

const defaultState = {
    buildStageAvailable: true,
};

export default handleActions({}, defaultState);
