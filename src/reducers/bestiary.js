// local dependencies
import {BESTIARY, PRELOADER} from '../actions/types';

// configuration
let initialState = {
    expectAnswer: true,
    errorMessage: '',
    bestiary: [],
};

export default function ( state = initialState, action ) {
    let { type, ...options } = action;
    switch ( type ) {
        default:
            state = {...state};
            break;
        case PRELOADER:
            state = { ...state, expectAnswer: options.expectAnswer };
            break;
        case BESTIARY.GET_BESTIARY.START:
            state = { ...state, ...options };
            break;
    }
    return state;
}