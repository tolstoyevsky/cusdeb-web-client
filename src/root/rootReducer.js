import { combineReducers } from "redux";

import appReducer from "modules/App/reducers/app";

const rootReducer = combineReducers({
    app: appReducer,
});

export default rootReducer;
