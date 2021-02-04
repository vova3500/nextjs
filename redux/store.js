import { createStore, compose, applyMiddleware } from "redux";
import rootReduser from "./reducers";
import createSagaMiddleware from 'redux-saga'
import {composeWithDevTools} from "redux-devtools-extension";

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
    rootReduser,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
);

export default store;