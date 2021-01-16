import {
    all,
    call,
    fork,
    put,
    takeEvery,
} from "redux-saga/effects";

import { confirmEmail } from "api/http/users";
import { CONFIRM_EMAIL_REQUEST } from "../constants/confirmEmail";
import { confirmEmailRequestFailed, confirmEmailRequestSucceeded } from "../actions/confirmEmail";

function* confirmEmailRequest({ payload: token }) {
    try {
        yield call(() => confirmEmail(token));
        yield put(confirmEmailRequestSucceeded());
    } catch {
        yield put(confirmEmailRequestFailed());
    }
}

function* watchFetchTokenStatus() {
    yield takeEvery(CONFIRM_EMAIL_REQUEST, confirmEmailRequest);
}

export default function* confirmEmailSaga() {
    yield all([
        fork(watchFetchTokenStatus),
    ]);
}
