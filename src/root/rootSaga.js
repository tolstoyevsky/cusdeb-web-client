import { all, fork } from "redux-saga/effects";

import userSaga from "modules/App/sagas/app";
import dashboardSaga from "modules/Dashboard/sagas/dashboard";

export default function* rootSaga() {
    yield all([
        fork(userSaga),
        fork(dashboardSaga),
    ]);
}
