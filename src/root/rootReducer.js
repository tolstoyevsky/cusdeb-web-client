import { combineReducers } from "redux";

import appReducer from "modules/App/reducers/app";
import builderReducer from "modules/Builder/components/Builder/reducers/builder";
import configurationReducer from "modules/Builder/components/Configuration/reducers/configuration";
import confirmEmailReducer from "modules/ConfirmEmail/reducers/confirmEmail";
import dashboardReducer from "modules/Dashboard/reducers/dashboard";
import imageReducer from "common/engines/Image/reducers/image";
import initializationReducer from "modules/Builder/components/Initialization/reducers/initialization";

const rootReducer = combineReducers({
    app: appReducer,
    builder: builderReducer,
    configuration: configurationReducer,
    confirmEmail: confirmEmailReducer,
    dashboard: dashboardReducer,
    image: imageReducer,
    initialization: initializationReducer,
});

export default rootReducer;
