import { combineReducers } from "redux";

import appReducer from "modules/App/reducers/app";
import initializationReducer from "modules/Builder/components/Initialization/reducers/initialization";

const rootReducer = combineReducers({
    app: appReducer,
    initialization: initializationReducer,
});

export default rootReducer;
