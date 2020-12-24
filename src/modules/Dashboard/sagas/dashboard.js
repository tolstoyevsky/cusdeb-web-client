import {
    all,
    call,
    fork,
    put,
    select,
    takeEvery,
} from "redux-saga/effects";

import { listUserImages, updateImageNotes, deleteImage as deleteImageAPI } from "api/http/images";
import { fetchUserImagesListSucceeded, deleteImageSucceeded, updateNotesSucceeded } from "../actions/dashboard";
import { FETCH_USER_IMAGES_LIST, UPDATE_NOTES, DELETE_IMAGE } from "../constants/dashboard";

export const getDashboard = (state) => state.dashboard;

function* deleteImage({ payload: imageId }) {
    try {
        yield call(() => deleteImageAPI(imageId));
        yield put(deleteImageSucceeded(imageId));
    } catch {
        // TODO: handle error
    }
}

function* watchDeleteImage() {
    yield takeEvery(DELETE_IMAGE, deleteImage);
}

function* fetchUserImagesList() {
    try {
        const { data } = yield call(() => listUserImages());
        yield put(fetchUserImagesListSucceeded(data));
    } catch (_error) {
        // TODO: handle error
    }
}

function* watchFetchUserImagesList() {
    yield takeEvery(FETCH_USER_IMAGES_LIST, fetchUserImagesList);
}

function* updateNotes() {
    const dashboard = yield select(getDashboard);
    try {
        yield call(() => updateImageNotes(dashboard.imageId, dashboard.modalValue));
        yield put(updateNotesSucceeded(dashboard.imageId));
    } catch (_error) {
        // TODO: handle error
    }
}

function* watchUpdateNotes() {
    yield takeEvery(UPDATE_NOTES, updateNotes);
}

export default function* dashboardSaga() {
    yield all([
        fork(watchFetchUserImagesList),
        fork(watchUpdateNotes),
        fork(watchDeleteImage),
    ]);
}
