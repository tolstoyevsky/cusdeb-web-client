import {
    all,
    call,
    fork,
    put,
    takeEvery,
} from "redux-saga/effects";

import Blackmagic from "api/rpc/blackmagic";
import { fetchTZData } from "api/http/cdtz";
import { fetchTimeZonesListSucceeded, fetchConfigurationParamsSucceeded } from "../actions/configuration";
import { FETCH_CONFIGURATION_PARAMS, FETCH_TIME_ZONES_LIST } from "../constants/configuration";

function* fetchConfigurationParams() {
    try {
        const blackmagic = new Blackmagic();
        const configurationParams = yield call(blackmagic.fetchConfiguration);
        yield put(fetchConfigurationParamsSucceeded(configurationParams));
    } catch (_error) {
        // TODO: handle error
    }
}

function* fetchTimeZonesList() {
    try {
        const { data: timeZonesList } = yield call(fetchTZData);
        yield put(fetchTimeZonesListSucceeded(timeZonesList));
    } catch (_error) {
        // TODO: handle error
    }
}

function* watchFetchConfigurationParams() {
    yield takeEvery(FETCH_CONFIGURATION_PARAMS, fetchConfigurationParams);
}

function* watchFetchTimeZonesList() {
    yield takeEvery(FETCH_TIME_ZONES_LIST, fetchTimeZonesList);
}

export default function* configurationSaga() {
    yield all([
        fork(watchFetchTimeZonesList),
        fork(watchFetchConfigurationParams),
    ]);
}
