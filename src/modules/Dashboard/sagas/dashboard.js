import {
    all,
    call,
    fork,
    put,
    takeEvery,
} from "redux-saga/effects";

import { listImages, updateImageNotes, deleteImage as deleteImageAPI } from "api/http/images";
import { fetchImagesListSucceeded, deleteImageSucceeded, updateNotesSucceeded } from "../actions/dashboard";
import { FETCH_IMAGES_LIST, UPDATE_NOTES, DELETE_IMAGE } from "../constants/dashboard";

function* deleteImage({ payload: imageId }) {
    try {
        yield call(() => deleteImageAPI(imageId));
        yield put(deleteImageSucceeded(imageId));
    } catch {
        // TODO: handle error
    }
}

function* fetchImagesList() {
    try {
        const { data: imagesList } = yield call(listImages);
        yield put(fetchImagesListSucceeded(imagesList.reverse()));
    } catch (_error) {
        // TODO: handle error
    }
}

function* updateNotes({ payload: { imageId, notes } }) {
    try {
        yield call(() => updateImageNotes(imageId, notes));
        yield put(updateNotesSucceeded({ imageId, notes }));
    } catch (_error) {
        // TODO: handle error
    }
}

function* watchDeleteImage() {
    yield takeEvery(DELETE_IMAGE, deleteImage);
}

function* watchFetchImagesList() {
    yield takeEvery(FETCH_IMAGES_LIST, fetchImagesList);
}

function* watchUpdateNotes() {
    yield takeEvery(UPDATE_NOTES, updateNotes);
}

export default function* dashboardSaga() {
    yield all([
        fork(watchFetchImagesList),
        fork(watchUpdateNotes),
        fork(watchDeleteImage),
    ]);
}
