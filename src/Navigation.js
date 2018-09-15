import React from 'react';
import { StyleSheet, View, Image, ScrollView, Animated, Easing } from 'react-native';

import { reduxifyNavigator, createReactNavigationReduxMiddleware, createNavigationReducer } from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';
import { createFluidNavigator } from 'react-navigation-fluid-transitions';

import { DrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import { Drawer } from 'react-native-material-ui';
import { StylesConst } from './utils/styles';

import MainScreen from './components/views/Main';
import TestScreen from './components/views/Test';

const transitionConfig = {
    duration: 400,
    delay: 0,
    timing: Animated.timing
};

const AppNavigator = createFluidNavigator({
    Main: {
        screen: MainScreen,
        navigationOptions: () => ({
            header: (<View style={{ height: 0, backgroundColor: 'transparent' }} />)
        })
    },
    Test: {
        screen: TestScreen
        // navigationOptions: () => ({
        //     header: (<View style={{ height: 0, backgroundColor: 'transparent' }} />)
        // })
    }
}, { transitionConfig }, {
    initialRouteName: 'Main',
    navigationOptions: { gesturesEnabled: true }
})

const AppDrawer = DrawerNavigator({
    AppNavigator: {
        screen: AppNavigator,
        navigationOptions: () => ({
            drawerLabel: 'Рестораны',
            drawerIcon: ({ tintColor }) => (
                <Image
                    source={require('../assets/images/icons/drawer/restaurants.png')}
                    style={[styles.icon, { tintColor: StylesConst.accentColor }]}
                />
            )
        })
    },
}, {
        contentComponent: (props) => <CustomDrawerContentComponent {...props} />,
        contentOptions: {
            activeBackgroundColor: 'transparent',
            activeTintColor: StylesConst.accentColor,
            labelStyle: {
                fontFamily: 'ya_r',
                fontWeight: 'normal',
                fontSize: 17
            }
        }
    })

const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always', horizontal: 'never' }}>
            <Drawer.Header >
                <Image
                    source={require('../assets/images/ui/drawer/bg.jpg')}
                    style={styles.drawerBg}
                />
            </Drawer.Header>

            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
);

const styles = StyleSheet.create({
    icon: {
        height: 14,
        width: 14.5
    },
    drawerBg: {
        height: '100%',
        width: '100%'
    }
})

export const navReducer = createNavigationReducer(AppDrawer);

export const navMiddleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav,
);

const App = reduxifyNavigator(AppDrawer, "root");

const mapStateToProps = (state) => ({
    state: state.nav,
});

export const AppWithNavigationState = connect(mapStateToProps)(App);