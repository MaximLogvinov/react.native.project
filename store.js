// outsource dependencies
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from 'redux-saga';
import thunk from "redux-thunk";
//local dependencies
import allReducers from './src/reducers/index';
import sagas from './src/saga/index';
import { navMiddleware } from './src/navigation/Navigator';

// configure
const sagaMiddleware = createSagaMiddleware();

export default createStore(
    allReducers,
    composeWithDevTools (applyMiddleware( navMiddleware, thunk, sagaMiddleware ))
);

sagaMiddleware.run( sagas );

