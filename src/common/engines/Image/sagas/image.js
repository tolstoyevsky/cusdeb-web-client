import {
    all,
    call,
    fork,
    put,
    takeEvery,
} from "redux-saga/effects";

import { updateImageNotes, deleteImage as deleteImageAPI } from "api/http/images";
import { DELETE_IMAGE, UPDATE_NOTES } from "../constants/image";
import { toggleNotesSucceededMessage } from "../actions/image";

function* deleteImage({ payload: { imageId, onSuccess = null } }) {
    try {
        yield call(() => deleteImageAPI(imageId));
        if (onSuccess) {
            yield put(onSuccess(imageId));
        }
    } catch {
        // TODO: handle error
    }
}

function* updateNotes({ payload: { imageId, notes, onSuccess = null } }) {
    try {
        yield call(() => updateImageNotes(imageId, notes));
        if (onSuccess) {
            yield put(onSuccess({ imageId, notes }));
        }
        yield put(toggleNotesSucceededMessage(true));
    } catch (_error) {
        // TODO: handle error
    }
}

function* watchDeleteImage() {
    yield takeEvery(DELETE_IMAGE, deleteImage);
}

function* watchUpdateNotes() {
    yield takeEvery(UPDATE_NOTES, updateNotes);
}

export default function* imageSaga() {
    yield all([
        fork(watchDeleteImage),
        fork(watchUpdateNotes),
    ]);
}
