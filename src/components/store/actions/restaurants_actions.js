import { GET_RESTAURANTS } from '../types';
import { DB_URL } from '../../../utils/misc';

import axios from 'axios';

export function getRestaurants() {
    let URL = `${DB_URL}/restaurants.json`;

    const request = axios(URL).then(response => {
        return response.data;
    })

    return {
        type: GET_RESTAURANTS,
        payload: request
    }
}