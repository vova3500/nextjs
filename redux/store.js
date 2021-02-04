import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga'
import {composeWithDevTools} from "redux-devtools-extension";
import {createWrapper} from "next-redux-wrapper";

import rootReduser from "./reducers";
import mySaga from '../redux/saga'

const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension')
        return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
}

export const makeStore = () => {
    // 1: Create the middleware
    const sagaMiddleware = createSagaMiddleware();

    // 2: Add an extra parameter for applying middleware:
    const store = createStore(rootReduser, bindMiddleware([sagaMiddleware]));

    // 3: Run your sagas on server
    store.sagaTask = sagaMiddleware.run(mySaga);

    // 4: now return the store:
    return store;
};

const wrapper = createWrapper(makeStore)

export default wrapper;


