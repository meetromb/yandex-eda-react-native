import { GET_CATEGORIES } from '../types';

export default function (state = {}, action) {
    switch (action.type) {
        case GET_CATEGORIES:
            return {...state, list: action.payload}
        break;
        default:
            return state;
    }
}