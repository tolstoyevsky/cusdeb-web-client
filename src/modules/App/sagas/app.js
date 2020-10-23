import {
    all,
    call,
    fork,
    put,
    takeEvery,
} from "redux-saga/effects";

import { whoAmI } from "api/http/users";
import { fetchUserFailed, fetchUserSucceeded } from "../actions/app";
import { FETCH_USER } from "../constants/app";

function* fetchUser() {
    try {
        const { data } = yield call(() => whoAmI());
        yield put(fetchUserSucceeded(data));
    } catch (_error) {
        yield put(fetchUserFailed());
    }
}

function* watchFetchUser() {
    yield takeEvery(FETCH_USER, fetchUser);
}

export default function* userSaga() {
    yield all([
        fork(watchFetchUser),
    ]);
}
