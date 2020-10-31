import { handleActions } from "redux-actions";

import {
    SET_BUILD_TYPE,
    SET_BUILD_TYPE_LIST,
    SET_BUILD_UUID,
    SET_DEVICE,
    SET_DEVICE_LIST,
    SET_DISTRO,
    SET_DISTRO_LIST,
} from "../constants/initialization";

const defaultState = {
    buildType: null,
    buildTypeList: [],
    buildUUID: null,
    device: null,
    deviceList: [],
    distro: null,
    distroList: [],
};

export default handleActions(
    {
        [SET_BUILD_TYPE]: (state, { payload: buildType }) => ({
            ...state,
            buildType,
        }),
        [SET_BUILD_TYPE_LIST]: (state, { payload: buildTypeList }) => ({
            ...state,
            buildTypeList,
        }),
        [SET_BUILD_UUID]: (state, { payload: buildUUID }) => ({
            ...state,
            buildUUID,
        }),
        [SET_DEVICE]: (state, { payload: device }) => ({
            ...state,
            device,
        }),
        [SET_DEVICE_LIST]: (state, { payload: deviceList }) => ({
            ...state,
            deviceList,
        }),
        [SET_DISTRO]: (state, { payload: distro }) => ({
            ...state,
            distro,
        }),
        [SET_DISTRO_LIST]: (state, { payload: distroList }) => ({
            ...state,
            distroList,
        }),
    },
    defaultState,
);
