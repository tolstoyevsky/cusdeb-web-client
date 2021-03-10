import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

let store = null;

export const configureStore = (reducer = null, saga = null) => {
    if (!store && reducer && saga) {
        const sagaMiddleware = createSagaMiddleware();

        store = createStore(
            reducer,
            composeWithDevTools(
                applyMiddleware(sagaMiddleware),
            ),
        );

        sagaMiddleware.run(saga);
    }

    return store;
};
