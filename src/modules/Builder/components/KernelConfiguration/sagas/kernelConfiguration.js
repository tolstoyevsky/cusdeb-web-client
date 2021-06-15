import {
    all,
    call,
    fork,
    put,
    takeEvery,
} from "redux-saga/effects";

import GiS from "api/rpc/gis";
import { fetchKernelConfiguratorThemesSucceeded } from "../actions/kernelConfiguration";
import {
    FETCH_KERNEL_CONFIGURATOR_THEMES,
    INIT_NEW_KERNEL_CONFIGURATION,
    SET_KERNEL_CONFIGURATOR_THEME,
} from "../constants/kernelConfiguration";
import { latestBuildUUDKey } from "../../Initialization/components/Initialization/Initialization";

function* fetchKernelConfiguratorThemes() {
    try {
        const gis = new GiS();
        const configuratorThemes = yield call(gis.fetchKernelConfiguratorThemes);
        yield put(fetchKernelConfiguratorThemesSucceeded(configuratorThemes));
    } catch (_error) {
        // TODO: handle error
    }
}

function* initNewKernelConfiguration() {
    try {
        const gis = new GiS();
        const latestBuildUUID = window.localStorage.getItem(latestBuildUUDKey);

        yield gis.initNewKernelConfiguration(latestBuildUUID);
    } catch (_error) {
        // TODO: handle error
    }
}

function* setKernelConfiguratorTheme({ payload: { theme } }) {
    try {
        const gis = new GiS();
        yield call(gis.setKernelConfiguratorTheme, theme);
    } catch (_error) {
        // TODO: handle error
    }
}

function* watchFetchKernelConfiguratorThemes() {
    yield takeEvery(FETCH_KERNEL_CONFIGURATOR_THEMES, fetchKernelConfiguratorThemes);
}

function* watchInitNewKernelConfiguration() {
    yield takeEvery(INIT_NEW_KERNEL_CONFIGURATION, initNewKernelConfiguration);
}

function* watchSetKernelConfiguratorTheme() {
    yield takeEvery(SET_KERNEL_CONFIGURATOR_THEME, setKernelConfiguratorTheme);
}

export default function* kernelConfigurationSaga() {
    yield all([
        fork(watchFetchKernelConfiguratorThemes),
        fork(watchInitNewKernelConfiguration),
        fork(watchSetKernelConfiguratorTheme),
    ]);
}
