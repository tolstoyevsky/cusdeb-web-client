import { createAction } from "redux-actions";

import {
    EXECUTE_STAGE,
    IMAGE_IS_AVAILABLE_FOR_RECOVERY,
    INIT_EXISTING_IMAGE,
    SET_BUILD_TYPE,
    SET_BUILD_TYPE_LIST,
    SET_BUILD_UUID,
    SET_DEVICE_SHORT_NAME,
    SET_DISTRO_SHORT_NAME,
    SET_DISTRO_LIST,
    SET_LATEST_BUILD_IMAGE,
    TOGGLE_CONTINUE_BUILD_MODAL,
} from "../constants/initialization";

export const executeStage = createAction(EXECUTE_STAGE);

export const isImageAvailableForRecovery = createAction(IMAGE_IS_AVAILABLE_FOR_RECOVERY);

export const initExistingImage = createAction(INIT_EXISTING_IMAGE);

export const setBuildType = createAction(SET_BUILD_TYPE);

export const setBuildTypeList = createAction(SET_BUILD_TYPE_LIST);

export const setBuildUUID = createAction(SET_BUILD_UUID);

export const setDeviceShortName = createAction(SET_DEVICE_SHORT_NAME);

export const setDistroShortName = createAction(SET_DISTRO_SHORT_NAME);

export const setDistroList = createAction(SET_DISTRO_LIST);

export const setLatestBuildImage = createAction(SET_LATEST_BUILD_IMAGE);

export const toggleContinueBuildModal = createAction(TOGGLE_CONTINUE_BUILD_MODAL);
