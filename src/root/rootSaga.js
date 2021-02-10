import { all, fork } from "redux-saga/effects";

import confirmEmailSaga from "modules/ConfirmEmail/sagas/confirmEmail";
import initializationSaga from "modules/Builder/components/Initialization/sagas/initialization";
import userSaga from "modules/App/sagas/app";
import dashboardSaga from "modules/Dashboard/sagas/dashboard";
import configurationSaga from "modules/Builder/components/Configuration/sagas/configuration";

export default function* rootSaga() {
    yield all([
        fork(confirmEmailSaga),
        fork(initializationSaga),
        fork(userSaga),
        fork(dashboardSaga),
        fork(configurationSaga),
    ]);
}
