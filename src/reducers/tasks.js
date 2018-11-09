// local dependencies
import { MODAL } from '../actions/types';

// configuration
let initialState = {
    currentTaskDescription: '',
    currentTaskTitle: '',
    showTask: false
};

export default function ( state = initialState, action ) {
    let { type, ...options } = action;
    switch ( type ) {
        default:
            state = {...state};
            break;
        case MODAL.SHOW_MODAL:
            state = { ...state, ...options };
            break;
        case MODAL.HIDE_MODAL:
            state = { ...state, ...options };
            break;
    }
    return state;
}