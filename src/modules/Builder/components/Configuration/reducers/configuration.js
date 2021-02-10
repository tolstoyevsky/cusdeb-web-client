import { handleActions } from "redux-actions";

import {
    FETCH_CONFIGURATION_PARAMS_SUCCEEDED,
    FETCH_TIME_ZONES_LIST_SUCCEEDED,
    SET_FIELD_STATUS,
    UPDATE_CONFIGURATION_PARAMS,
} from "../constants/configuration";

const defaultState = {
    fieldStatuses: {},
    configurationParams: {},
    timeZonesList: [],
};

export default handleActions(
    {
        [FETCH_CONFIGURATION_PARAMS_SUCCEEDED]: (state, { payload: configurationParams }) => ({
            ...state,
            configurationParams,
        }),
        [FETCH_TIME_ZONES_LIST_SUCCEEDED]: (state, { payload: timeZonesList }) => ({
            ...state,
            timeZonesList,
        }),
        [SET_FIELD_STATUS]: (state, { payload: fieldStatus }) => ({
            ...state,
            fieldStatuses: {
                ...state.fieldStatuses,
                ...fieldStatus,
            },
        }),
        [UPDATE_CONFIGURATION_PARAMS]: (state, { payload: { key, value } }) => ({
            ...state,
            configurationParams: {
                ...state.configurationParams,
                [key]: value,
            },
        }),
    },
    defaultState,
);
