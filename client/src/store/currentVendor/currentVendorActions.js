import { SET_CURRENT_VENDOR } from './currentvendorActionTypes';

export const setCurrentvendor = (payload) => {
    return { type: SET_CURRENT_VENDOR, payload: payload }
}
