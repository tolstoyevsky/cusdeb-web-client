import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "modules/App/components/App/App";
import "./i18n";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
import * as sentry from "./sentry";
import { configureStore } from "./store";

import "styles/index.scss";
// eslint-disable-next-line import/no-unresolved
import "admin-lte-js";
import "bootstrap";
import "select2";

sentry.init();

const store = configureStore(rootReducer, rootSaga);

ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
), document.getElementById("root"));
