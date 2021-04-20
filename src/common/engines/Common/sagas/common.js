import {
    all,
    call,
    fork,
    put,
    takeEvery,
} from "redux-saga/effects";

import { listDevice } from "api/http/images";
import { FETCH_DEVICE_LIST } from "../constants/common";
import { setDeviceList } from "../actions/common";

function* fetchListDevice() {
    const { data: deviceList } = yield call(listDevice);
    yield put(setDeviceList(deviceList));
}

function* watchFetchListDevice() {
    yield takeEvery(FETCH_DEVICE_LIST, fetchListDevice);
}

export default function* commonSaga() {
    yield all([
        fork(watchFetchListDevice),
    ]);
}
