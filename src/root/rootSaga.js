import { all, fork } from "redux-saga/effects";

import initializationSaga from "modules/Builder/components/Initialization/sagas/initialization";
import userSaga from "modules/App/sagas/app";
import dashboardSaga from "modules/Dashboard/sagas/dashboard";

export default function* rootSaga() {
    yield all([
        fork(initializationSaga),
        fork(userSaga),
        fork(dashboardSaga),
    ]);
}
