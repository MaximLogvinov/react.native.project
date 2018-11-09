
// local dependencies
import { LOGIN_PAGE, PRELOADER, LOG_OUT} from '../actions/types';

// configuration
let initialState = {
    expectAnswer: false,
    failedAuth: false,
    logInErrorMessage: '',
    name: 'User',
    password: '',
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
        case LOGIN_PAGE.LOG_IN.START:
            state = { ...state, ...options, failedAuth: false };
            break;
        case LOGIN_PAGE.LOG_IN.ERROR:
            state = { ...state, ...options };
            break;
        case LOG_OUT:
            state = { ...initialState };
            break;
    }
    return state;
}

