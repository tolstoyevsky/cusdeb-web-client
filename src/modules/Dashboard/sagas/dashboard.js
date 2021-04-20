import {
    all,
    call,
    fork,
    put,
    takeEvery,
} from "redux-saga/effects";

import { listImages } from "api/http/images";
import { fetchImagesListSucceeded } from "../actions/dashboard";
import { FETCH_IMAGES_LIST } from "../constants/dashboard";

function* fetchImagesList() {
    try {
        const { data: imagesList } = yield call(listImages);
        yield put(fetchImagesListSucceeded(imagesList.reverse()));
    } catch (_error) {
        // TODO: handle error
    }
}

function* watchFetchImagesList() {
    yield takeEvery(FETCH_IMAGES_LIST, fetchImagesList);
}

export default function* dashboardSaga() {
    yield all([
        fork(watchFetchImagesList),
    ]);
}
