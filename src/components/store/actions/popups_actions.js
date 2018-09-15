import { UPDATE_DELIVERY_POPUP } from '../types';

export function updatePopup(popupId, status) {
    const payload = {
        popupId: popupId,
        status: status
    }

    switch (popupId) {
        case 'delivery':
            return {
                type: UPDATE_DELIVERY_POPUP,
                payload: payload
            }
            break;
        default:
            return null;
    }
}