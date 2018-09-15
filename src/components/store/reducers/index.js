import { combineReducers } from 'redux';

import Categories from './categories_reducer';
import Restaurants from './restaurants_reducer';
import Popups from './popups_reducer';

import { navReducer } from '../../../Navigation';

const rootReducer = combineReducers({
    nav: navReducer,
    Categories,
    Restaurants,
    Popups
});

export default rootReducer;