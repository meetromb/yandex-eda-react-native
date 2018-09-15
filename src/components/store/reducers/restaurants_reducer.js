import { GET_RESTAURANTS } from '../types';

export default function (state = {}, action) {
    switch (action.type) {
        case GET_RESTAURANTS:
            return {...state, list: action.payload}
        break;
        default:
            return state;
    }
}