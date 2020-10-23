import { all, fork } from "redux-saga/effects";

import userSaga from "modules/App/sagas/app";

export default function* rootSaga() {
    yield all([
        fork(userSaga),
    ]);
}
