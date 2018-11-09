
// outsource dependencies
import { takeEvery, call, put } from 'redux-saga/effects';

//local dependencies
import { PRELOADER, BESTIARY } from "../actions/types";

function* showBestiary(action) {
    let { type, ...options } = action;
    yield put({type: PRELOADER, expectAnswer: true});
    try {
        let results = yield call(getData, options);
        yield put({type: BESTIARY.GET_BESTIARY.SUCCESS, ...results });
    } catch ( error ) {
        yield put({type: BESTIARY.GET_BESTIARY.ERROR, errorMessage: error.message });
    }
    yield put({type: PRELOADER, expectAnswer: false});
    yield put({type: BESTIARY.GET_BESTIARY.FINISH});
}

// Export root watcher for "pages"
export default function* () {
    yield takeEvery(BESTIARY.GET_BESTIARY.START, showBestiary);
}

function getData ( options ) {

    return new Promise((resolve) => {
        setTimeout(()=> {
            resolve(options);
        }, 2*1000);
    }).then( data => {
        // if server response failed
        if ( !data ) {
            throw new Error('Witcher not found! Wrong name or password.')
        }
    });
}
