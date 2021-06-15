import { handleActions } from "redux-actions";

import {
    FETCH_KERNEL_CONFIGURATOR_THEMES_SUCCEEDED,
} from "../constants/kernelConfiguration";

const defaultState = {
    kernelConfiguratorThemes: [],
};

export default handleActions(
    {
        [FETCH_KERNEL_CONFIGURATOR_THEMES_SUCCEEDED]: (state, {
            payload: kernelConfiguratorThemes,
        }) => ({
            ...state,
            kernelConfiguratorThemes,
        }),
    },
    defaultState,
);
