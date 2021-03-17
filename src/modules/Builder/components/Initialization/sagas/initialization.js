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
import {
    setBuildType,
    setBuildUUID,
    setDeviceList,
    setDeviceShortName,
    setDistroShortName,
    setLatestBuildImage,
    toggleContinueBuildModal,
} from "../actions/initialization";
import { latestBuildUUDKey } from "../components/Initialization/Initialization";
import {
    EXECUTE_STAGE,
    FETCH_DEVICE_LIST,
    IMAGE_IS_AVAILABLE_FOR_RECOVERY,
    INIT_EXISTING_IMAGE,
} from "../constants/initialization";

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

function* isImageAvailableForRecovery({ payload: imageId }) {
    const blackmagic = new Blackmagic();

    const query = blackmagic.isImageAvailableForRecovery(imageId);
    query.catch(() => {
        window.localStorage.removeItem(latestBuildUUDKey);
    });

    const latestBuildImage = yield query;
    if (latestBuildImage) {
        yield put(setLatestBuildImage(latestBuildImage));
        yield put(toggleContinueBuildModal());
    }
}

function* initExistingImage({ payload: callback }) {
    const blackmagic = new Blackmagic();
    const latestBuildUUID = window.localStorage.getItem(latestBuildUUDKey);

    yield blackmagic.initExistingImage(latestBuildUUID);

    const { latestBuildImage } = yield select(getInitialization);
    yield put(setBuildType(latestBuildImage.flavor));
    yield put(setDeviceShortName(latestBuildImage.device_name));
    yield put(setDistroShortName(latestBuildImage.distro_name));

    return callback();
}

function* watchExecuteStage() {
    yield takeEvery(EXECUTE_STAGE, executeStage);
}

function* watchFetchListDevice() {
    yield takeEvery(FETCH_DEVICE_LIST, fetchListDevice);
}

function* watchIsImageAvailableForRecovery() {
    yield takeEvery(IMAGE_IS_AVAILABLE_FOR_RECOVERY, isImageAvailableForRecovery);
}

function* watchInitExistingImage() {
    yield takeEvery(INIT_EXISTING_IMAGE, initExistingImage);
}

export default function* builderSaga() {
    yield all([
        fork(watchExecuteStage),
        fork(watchFetchListDevice),
        fork(watchIsImageAvailableForRecovery),
        fork(watchInitExistingImage),
    ]);
}
