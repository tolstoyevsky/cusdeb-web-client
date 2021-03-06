import { handleActions } from "redux-actions";

import {
    SET_BUILD_TYPE,
    SET_BUILD_TYPE_LIST,
    SET_BUILD_UUID,
    SET_DEVICE_SHORT_NAME,
    SET_DISTRO_SHORT_NAME,
    SET_DISTRO_LIST,
    SET_LATEST_BUILD_IMAGE,
    TOGGLE_CONTINUE_BUILD_MODAL,
} from "../constants/initialization";

const defaultState = {
    buildType: null,
    buildTypeList: [],
    buildUUID: null,
    deviceShortName: null,
    distroShortName: null,
    distroList: {},
    latestBuildImage: {},
    showContinueBuildModal: false,
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
        [SET_DEVICE_SHORT_NAME]: (state, { payload: deviceShortName }) => ({
            ...state,
            deviceShortName,
        }),
        [SET_DISTRO_SHORT_NAME]: (state, { payload: distroShortName }) => ({
            ...state,
            distroShortName,
        }),
        [SET_DISTRO_LIST]: (state, { payload: distroList }) => ({
            ...state,
            distroList,
        }),
        [SET_LATEST_BUILD_IMAGE]: (state, { payload: latestBuildImage }) => ({
            ...state,
            latestBuildImage,
        }),
        [TOGGLE_CONTINUE_BUILD_MODAL]: (state) => ({
            ...state,
            showContinueBuildModal: !state.showContinueBuildModal,
        }),
    },
    defaultState,
);
