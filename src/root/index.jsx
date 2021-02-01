import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import App from "modules/App/components/App/App";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
import * as sentry from "./sentry";

import "styles/index.scss";
// eslint-disable-next-line import/no-unresolved
import "admin-lte-js";
import "bootstrap";
import "select2";

sentry.init();

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(sagaMiddleware),
    ),
);

sagaMiddleware.run(rootSaga);

ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
), document.getElementById("root"));
