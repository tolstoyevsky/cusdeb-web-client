import { createAction } from "redux-actions";

import {
    FETCH_CONFIGURATION_PARAMS,
    FETCH_CONFIGURATION_PARAMS_SUCCEEDED,
    FETCH_TIME_ZONES_LIST,
    FETCH_TIME_ZONES_LIST_SUCCEEDED,
    SET_FIELD_STATUS,
    UPDATE_CONFIGURATION_PARAMS,
} from "../constants/configuration";

export const fetchConfigurationParams = createAction(FETCH_CONFIGURATION_PARAMS);

export const fetchConfigurationParamsSucceeded = createAction(
    FETCH_CONFIGURATION_PARAMS_SUCCEEDED,
);

export const fetchTimeZonesList = createAction(FETCH_TIME_ZONES_LIST);

export const fetchTimeZonesListSucceeded = createAction(FETCH_TIME_ZONES_LIST_SUCCEEDED);

export const setFieldStatus = createAction(SET_FIELD_STATUS);

export const updateConfigurationParams = createAction(UPDATE_CONFIGURATION_PARAMS);
