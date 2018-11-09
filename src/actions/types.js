
export const SUFFIX = {
    START: 'START',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
    FINISH: 'FINISH',
};

export function createType ( type ) {
    let action = {};
    for ( let name of Object.keys(SUFFIX) ) {
        action[name] = `${type}.${name}`;
    }
    return action;
}
export const LOG_OUT = 'LOG_OUT';
export const PRELOADER = 'PRELOADER';
export const MODAL = {
    SHOW_MODAL: 'SHOW_MODAL',
    HIDE_MODAL: 'HIDE_MODAL',
};

let prefixLogIn = '@login/';
export const LOGIN_PAGE = {
    LOG_IN: createType(`${prefixLogIn}LOG_IN`)
};

export const BESTIARY = {
    GET_BESTIARY: createType(`GET_BESTIARY`)
};