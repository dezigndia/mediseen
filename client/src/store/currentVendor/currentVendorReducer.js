import { SET_CURRENT_VENDOR } from './currentvendorActionTypes';

const initialState = {

}

const currentVendorReducer = (state = initialState, action) => {
    switch (action.payload) {
        case SET_CURRENT_VENDOR:
            return { ...action.payload }
        default:
            return state;
    }
}

export default currentVendorReducer;