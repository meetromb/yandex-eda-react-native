import React, { Component } from 'react';
import { View } from 'react-native';

import RestaurantListItem from './Item';

class RestaurantsList extends Component {
    generateList = (restaurants) => (
        restaurants
            ?
            restaurants.map((item) => (
                <RestaurantListItem
                    data={item}
                    key={item.id}
                />
            ))
            :
            null
    )

    render() {
        return (
            <View>
                {this.generateList(this.props.restaurants)}
            </View>
        )
    }
}

export default RestaurantsList;