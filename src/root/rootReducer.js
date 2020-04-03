import { combineReducers } from "redux";

import appReducer from "modules/App/reducers/app";
import dashboardReducer from "modules/Dashboard/reducers/dashboard";

const rootReducer = combineReducers({
    app: appReducer,
    dashboard: dashboardReducer,
});

export default rootReducer;
