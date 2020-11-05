import { createAction } from "redux-actions";

import {
    FETCH_DEVICE_LIST,
    SET_BUILD_TYPE,
    SET_BUILD_TYPE_LIST,
    SET_BUILD_UUID,
    SET_DEVICE,
    SET_DEVICE_LIST,
    SET_DISTRO,
    SET_DISTRO_LIST,
    TOGGLE_CONTINUE_BUILD_MODAL,
} from "../constants/initialization";

export const fetchDeviceList = createAction(FETCH_DEVICE_LIST);

export const setBuildType = createAction(SET_BUILD_TYPE);

export const setBuildTypeList = createAction(SET_BUILD_TYPE_LIST);

export const setBuildUUID = createAction(SET_BUILD_UUID);

export const setDevice = createAction(SET_DEVICE);

export const setDeviceList = createAction(SET_DEVICE_LIST);

export const setDistro = createAction(SET_DISTRO);

export const setDistroList = createAction(SET_DISTRO_LIST);

export const toggleContinueBuildModal = createAction(TOGGLE_CONTINUE_BUILD_MODAL);
