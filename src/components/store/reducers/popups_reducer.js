import { UPDATE_DELIVERY_POPUP } from '../types';

export default function (state = {}, action) {
    switch (action.type) {
        case UPDATE_DELIVERY_POPUP:
            return {...state, popups: {
                delivery: action.payload.status || false
            }, activePopup: action.payload.status ? action.payload.popupId : null}
        break;
        default:
        return {...state, popups: {
            delivery: false
        }, activePopup: null}
    }
}