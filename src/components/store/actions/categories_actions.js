import { GET_CATEGORIES } from '../types';
import { DB_URL } from '../../../utils/misc';

import axios from 'axios';

export function getCategories() {
    let URL = `${DB_URL}/categories.json`;

    const request = axios(URL).then(response => {
        return response.data;
    })

    return {
        type: GET_CATEGORIES,
        payload: request
    }
}