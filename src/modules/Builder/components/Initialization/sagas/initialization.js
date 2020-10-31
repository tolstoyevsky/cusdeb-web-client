import {
    all,
    call,
    fork,
    put,
    takeEvery,
} from "redux-saga/effects";

import { listDevice } from "api/http/images";
import { setDeviceList } from "../actions/initialization";
import { FETCH_DEVICE_LIST } from "../constants/initialization";

function* fetchListDevice() {
    const { data: deviceList } = yield call(listDevice);
    yield put(setDeviceList(deviceList));
}

function* watchFetchListDevice() {
    yield takeEvery(FETCH_DEVICE_LIST, fetchListDevice);
}

export default function* builderSaga() {
    yield all([
        fork(watchFetchListDevice),
    ]);
}
