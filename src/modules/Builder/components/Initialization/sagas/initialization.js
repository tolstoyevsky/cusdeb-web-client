import {
    all,
    call,
    fork,
    put,
    select,
    takeEvery,
} from "redux-saga/effects";

import { listDevice } from "api/http/images";
import Blackmagic from "api/rpc/blackmagic";
import { setBuildUUID, setDeviceList } from "../actions/initialization";
import { latestBuildUUDKey } from "../components/Initialization/Initialization";
import { EXECUTE_STAGE, FETCH_DEVICE_LIST, INIT_EXISTING_IMAGE } from "../constants/initialization";

const getInitialization = (state) => state.initialization;

const BUILD_TYPE_CODES = {
    "Classic image": 1,
    "Mender-compatible image": 2,
    "Mender artifact": 3,
};

function* executeStage({ payload: callback }) {
    const { deviceShortName, distroShortName, buildType } = yield select(getInitialization);

    const blackmagic = new Blackmagic();
    const buildUUID = yield blackmagic.initNewImage(
        deviceShortName,
        distroShortName,
        BUILD_TYPE_CODES[buildType],
    );

    window.localStorage.setItem(latestBuildUUDKey, buildUUID);
    yield put(setBuildUUID(buildUUID));

    return callback();
}

function* fetchListDevice() {
    const { data: deviceList } = yield call(listDevice);
    yield put(setDeviceList(deviceList));
}

function* initExistingImage({ payload: callback }) {
    const blackmagic = new Blackmagic();
    const latestBuildUUID = window.localStorage.getItem(latestBuildUUDKey);

    yield blackmagic.initExistingImage(latestBuildUUID);

    return callback();
}

function* watchExecuteStage() {
    yield takeEvery(EXECUTE_STAGE, executeStage);
}

function* watchFetchListDevice() {
    yield takeEvery(FETCH_DEVICE_LIST, fetchListDevice);
}

function* watchInitExistingImage() {
    yield takeEvery(INIT_EXISTING_IMAGE, initExistingImage);
}

export default function* builderSaga() {
    yield all([
        fork(watchExecuteStage),
        fork(watchFetchListDevice),
        fork(watchInitExistingImage),
    ]);
}
