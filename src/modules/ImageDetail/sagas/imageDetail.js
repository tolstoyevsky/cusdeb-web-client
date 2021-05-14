import {
    all,
    call,
    fork,
    put,
    takeEvery,
} from "redux-saga/effects";

import { getImageDetail } from "api/http/images";
import { fetchImageFailed, fetchImageSucceeded } from "../actions/imageDetail";
import { FETCH_IMAGE } from "../constants/imageDetail";

function* fetchImage({ payload: imageId }) {
    try {
        const { data } = yield call(getImageDetail, imageId);
        yield put(fetchImageSucceeded(data));
    } catch (_error) {
        yield put(fetchImageFailed());
    }
}

function* watchFetchImage() {
    yield takeEvery(FETCH_IMAGE, fetchImage);
}

export default function* imageDetailSaga() {
    yield all([
        fork(watchFetchImage),
    ]);
}
