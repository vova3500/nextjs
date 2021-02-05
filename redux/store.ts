import {createStore, applyMiddleware, Store, Middleware, StoreEnhancer} from "redux";
import createSagaMiddleware, {Task} from 'redux-saga'
import {createWrapper, MakeStore} from "next-redux-wrapper";

import rootReducer from "./reducers";
import mySaga from './saga'
import {AppState} from "./reducers/typeStore";

export interface SagaStore extends Store {
    sagaTask?: Task;
}

const bindMiddleware = (middleware: Middleware[]): StoreEnhancer => {
    if (process.env.NODE_ENV !== 'production') {
        const {composeWithDevTools} = require('redux-devtools-extension')
        return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
}

export const makeStore: MakeStore<AppState>  = ()=> {
    // 1: Create the middleware
    const sagaMiddleware = createSagaMiddleware();

    // 2: Add an extra parameter for applying middleware:
    const store = createStore(rootReducer, bindMiddleware([sagaMiddleware]));

    // 3: Run your sagas on server
    (store as SagaStore).sagaTask = sagaMiddleware.run(mySaga);

    // 4: now return the store:
    return store;
};

const wrapper = createWrapper(makeStore)

export default wrapper;


