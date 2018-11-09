
// outsource dependencies
import { takeEvery, call, put } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';

//local dependencies
import { PRELOADER, LOGIN_PAGE } from "../actions/types";

function* witcherLogIn(action) {
    let { type, ...options } = action;
    yield put({type: PRELOADER, expectAnswer: true});
    try {
        let results = yield call(getData, options);
        yield put({type: LOGIN_PAGE.LOG_IN.SUCCESS, ...results });
        yield put(NavigationActions.navigate({routeName: 'Private'}));
    } catch ( error ) {
        yield put({type: LOGIN_PAGE.LOG_IN.ERROR, failedAuth: true, errorMessage: error.message });
    }
    yield put({type: PRELOADER, expectAnswer: false});
    yield put({type: LOGIN_PAGE.LOG_IN.FINISH});
}

// Export root watcher for "pages"
export default function* () {
    yield takeEvery(LOGIN_PAGE.LOG_IN.START, witcherLogIn);
}

function getData ( options ) {

    return new Promise((resolve) => {
        setTimeout(()=> {
            resolve(options);
        }, 2*1000);
    }).then( data => {
        // getting registered user value from login form submission
        if ( !data.registeredUser ) {
            throw new Error('Witcher not found! Wrong name or password.')
        }
    });
}
