import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';

import { store } from './components/store/config';
import PopupComponent from './components/views/Popups';

import { AppWithNavigationState } from './Navigation';

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>

                <View style={{ flex: 1 }}>
                    <AppWithNavigationState/>
                    <PopupComponent />
                </View>

            </Provider>
        )
    }
}