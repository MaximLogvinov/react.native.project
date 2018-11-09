// outsource dependencies
import { fork } from 'redux-saga/effects';
// local dependencies
import login from './login'
import bestiary from './bestiary';

export default function* sagas() {
    yield fork(login);
    yield fork(bestiary);
}