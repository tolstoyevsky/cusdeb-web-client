import { combineReducers } from "redux";

import appReducer from "modules/App/reducers/app";
import builderReducer from "modules/Builder/components/Builder/reducers/builder";
import commonReducer from "common/engines/Common/reducers/common";
import configurationReducer from "modules/Builder/components/Configuration/reducers/configuration";
import confirmEmailReducer from "modules/ConfirmEmail/reducers/confirmEmail";
import dashboardReducer from "modules/Dashboard/reducers/dashboard";
import imageDetailReducer from "modules/ImageDetail/reducers/imageDetail";
import imageReducer from "common/engines/Image/reducers/image";
import initializationReducer from "modules/Builder/components/Initialization/reducers/initialization";

const rootReducer = combineReducers({
    app: appReducer,
    builder: builderReducer,
    common: commonReducer,
    configuration: configurationReducer,
    confirmEmail: confirmEmailReducer,
    dashboard: dashboardReducer,
    image: imageReducer,
    imageDetail: imageDetailReducer,
    initialization: initializationReducer,
});

export default rootReducer;
