import { createAction } from "redux-actions";

import {
    FETCH_KERNEL_CONFIGURATOR_THEMES,
    FETCH_KERNEL_CONFIGURATOR_THEMES_SUCCEEDED,
    INIT_NEW_KERNEL_CONFIGURATION,
    SET_KERNEL_CONFIGURATOR_THEME,
} from "../constants/kernelConfiguration";

export const fetchKernelConfiguratorThemes = createAction(FETCH_KERNEL_CONFIGURATOR_THEMES);

export const fetchKernelConfiguratorThemesSucceeded = createAction(
    FETCH_KERNEL_CONFIGURATOR_THEMES_SUCCEEDED,
);

export const initNewKernelConfiguration = createAction(INIT_NEW_KERNEL_CONFIGURATION);

export const setKernelConfiguratorTheme = createAction(SET_KERNEL_CONFIGURATOR_THEME);
