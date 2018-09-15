import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, StatusBar, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import RestaurantListItem from '../Main/Restaurants/Item';

import { connect } from "react-redux";

import { Transition } from 'react-navigation-fluid-transitions';

class TestScreen extends Component {
    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <Transition shared={`item${this.props.navigation.getParam('itemId')}`}>
                    <RestaurantListItem
                        data={this.props.Restaurants.list[this.props.navigation.getParam('itemId')]}
                    />
                </Transition>

                <TouchableOpacity style={{height: 30, width: 70, backgroundColor: '#ccc'}} onPress={() => this.props.navigation.goBack()}/>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        Restaurants: state.Restaurants
    }
}

export default connect(mapStateToProps, null)(TestScreen);