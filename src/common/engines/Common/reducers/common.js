import { handleActions } from "redux-actions";

import {
    SET_DEVICE_LIST,
} from "../constants/common";

const defaultState = {
    deviceList: {},
};

export default handleActions(
    {
        [SET_DEVICE_LIST]: (state, { payload: deviceList }) => ({
            ...state,
            deviceList,
        }),
    },
    defaultState,
);
