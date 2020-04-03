import { combineReducers } from "redux";

import appReducer from "modules/App/reducers/app";
import dashboardReducer from "modules/Dashboard/reducers/dashboard";
import initializationReducer from "modules/Builder/components/Initialization/reducers/initialization";

const rootReducer = combineReducers({
    app: appReducer,
    dashboard: dashboardReducer,
    initialization: initializationReducer,
});

export default rootReducer;
