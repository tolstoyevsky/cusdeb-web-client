import {
    all,
    call,
    fork,
    put,
    select,
    takeEvery,
} from "redux-saga/effects";

import { listImages, updateImageNotes, deleteImage } from "api/http/images";
import { formatImagesList } from "../helpers/images";
import { fetchImagesListSucceeded, deleteImageSucceeded } from "../actions/dashboard";
import { FETCH_IMAGES_LIST, UPDATE_NOTES, DELETE_IMAGE } from "../constants/dashboard";

export const getDashboard = (state) => state.dashboard;

function* deleteCurrentImage({ payload: imageId }) {
    try {
        yield call(() => deleteImage(imageId));
        yield put(deleteImageSucceeded(imageId));
    } catch {
        // TODO: handle error
    }
}

function* watchCurrentDeleteImage() {
    yield takeEvery(DELETE_IMAGE, deleteCurrentImage);
}

function* fetchImagesList() {
    try {
        const { data } = yield call(() => listImages());
        yield put(fetchImagesListSucceeded(formatImagesList(data)));
    } catch (_error) {
        // TODO: handle error
    }
}

function* watchFetchImagesList() {
    yield takeEvery(FETCH_IMAGES_LIST, fetchImagesList);
}

function* updateNotes() {
    const dashboard = yield select(getDashboard);
    try {
        yield call(() => updateImageNotes(dashboard.imageId, dashboard.modalValue));
    } catch (_error) {
        // TODO: handle error
    }
}

function* watchUpdateNotes() {
    yield takeEvery(UPDATE_NOTES, updateNotes);
}

export default function* dashboardSaga() {
    yield all([
        fork(watchFetchImagesList),
        fork(watchUpdateNotes),
        fork(watchCurrentDeleteImage),
    ]);
}
