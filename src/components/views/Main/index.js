import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, StatusBar, Dimensions, FlatList, TouchableWithoutFeedback } from 'react-native';
import { withCollapsible, defaultheaderHeightConst } from 'react-navigation-collapsible';
import { StylesConst } from '../../../utils/styles';
import { filterRestaurants } from '../../../utils/misc';
import { BoxShadow } from 'react-native-shadow';
import { Transition } from 'react-navigation-fluid-transitions';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { getCategories } from '../../store/actions/categories_actions';
import { getRestaurants } from '../../store/actions/restaurants_actions';

import MenuButton from '../Drawer/MenuButton';
import AddressButton from '../Drawer/AddressButton';
import DeliveryTimeButton from '../Drawer/DeliveryTimeButton';
import HorizontalCategories from './Categories';
import RestaurantListItem from './Restaurants/Item';

const AnimatedScrollView = Animated.createAnimatedComponent(FlatList);
const AnimatedTouchableRestaurant = Animated.createAnimatedComponent(TouchableWithoutFeedback);

class MainScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            firstLoad: true,
            fadeAnim: new Animated.Value(0),
            spinLoader: new Animated.Value(0),
            categories: [],
            selectedCategory: 'all',
            restaurants: []
        }
    }

    componentDidMount() {
        Animated.loop(
            Animated.timing(this.state.spinLoader, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            })
        ).start();

        this.props.getCategories().then(() => {
            this.props.getRestaurants().then(() => {
                this.setState({
                    categories: this.props.Categories.list,
                    restaurants: this.props.Restaurants.list,
                    isLoading: false
                })

                Animated.timing(this.state.fadeAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true
                }).start(() => {
                    this.setState({
                        firstLoad: false
                    })
                });
            });
        });
    }

    _updateCategory = (value) => {
        if (this.state.selectedCategory != 'all' && this.state.selectedCategory === value) {
            this.setState({
                selectedCategory: 'all'
            })
        } else {
            this.setState({
                selectedCategory: value
            })
        }

        if (!this.state.isLoading) {
            this.setState({
                isLoading: true
            })
        }

        Animated.loop(
            Animated.timing(this.state.spinLoader, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            })
        ).start();

        Animated.timing(this.state.fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
        }).start(() => {
            if (this.state.selectedCategory === 'all') {
                Promise.all(filterRestaurants(this.props.Restaurants.list, 'all')).then((list) => {
                    this.setState({
                        restaurants: list,
                        isLoading: false,
                        fadeAnim: new Animated.Value(0)
                    })

                    Animated.timing(this.state.fadeAnim, {
                        toValue: 1,
                        duration: 300,
                        useNativeDriver: true
                    }).start();
                })
            } else {
                Promise.all(filterRestaurants(this.props.Restaurants.list, value)).then((list) => {
                    this.setState({
                        restaurants: list,
                        isLoading: false,
                        fadeAnim: new Animated.Value(0)
                    })

                    Animated.timing(this.state.fadeAnim, {
                        toValue: 1,
                        duration: 300,
                        useNativeDriver: true
                    }).start();
                })
            }
        });
    }

    _renderLoader() {
        if (this.state.isLoading) {
            return (
                <View style={[styles.loader, this.state.firstLoad ? { marginTop: 0 } : { marginTop: 120 }]}>
                    <Animated.Image
                        resizeMode={'contain'}
                        style={{
                            height: 80, width: 80,
                            transform: [{
                                rotate: this.state.spinLoader.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0deg', '360deg']
                                })
                            }]
                        }}
                        source={require('../../../../assets/images/ui/loader.png')}
                    />
                </View>
            )
        }
    }

    _renderCategories = () => {
        if (!this.state.isLoading || this.state.categories) {
            return (
                <HorizontalCategories
                    categories={this.state.categories}
                    selectedCategory={this.state.selectedCategory}
                    updateCategoryHandler={this._updateCategory}
                />
            )
        } else {
            return (
                this._renderLoader()
            )
        }
    }

    _renderRestaurantItem = (item, index) => {
        return (
            <AnimatedTouchableRestaurant 
                onPress={() => this.props.navigation.navigate("Test", { itemId: index })}
                style={[
                    { opacity: this.state.fadeAnim },
                    {
                        transform: [{
                            translateY: this.state.fadeAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [150, 0]
                            })
                        }]
                    }
                ]}    
            >
                <View>
                    <Transition shared={`item${index}`} animated='animateTransition'>
                        <RestaurantListItem
                            data={item}
                            key={item.id}
                            startPadding={15}
                            endPadding={0}
                            radius={8}
                        />
                    </Transition>
                </View>
            </AnimatedTouchableRestaurant>
        )
    }

    _keyExtractor = (item, index) => index.toString();

    render() {
        const { paddingHeight, scrollY, onScroll } = this.props.collapsible;

        return (
            <View style={{ height: '100%', width: '100%', backgroundColor: '#ccc' }}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={
                        this.props.Popups.activePopup ? '#b49133'
                            : StylesConst.accentColor_dark
                    }
                />

                {this._renderLoader()}

                <AnimatedScrollView
                    style={{ flex: 1, backgroundColor: '#fff', minHeight: '100%' }}
                    contentContainerStyle={{ paddingTop: paddingHeight }}
                    onScroll={onScroll}
                    _mustAddThis={scrollY}

                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={this._renderCategories}
                    data={this.state.restaurants}
                    keyExtractor={this._keyExtractor}
                    renderItem={({ item, index }) => this._renderRestaurantItem(item, index)}
                    initialNumToRender={2}
                    getItemLayout={(data, index) => (
                        { length: 300, offset: 300 * index, index }
                    )}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        height: 56,
        width: '100%',
        backgroundColor: StylesConst.accentColor,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 10
    },
    headerLeftBtn: {
        position: 'absolute',
        left: 10,
        zIndex: 11
    },
    headerCenterBtn: {
        position: 'absolute',
        left: 0,
        width: '100%',
        paddingHorizontal: 56,
        zIndex: 10
    },
    headerRightBtn: {
        position: 'absolute',
        right: 10,
        zIndex: 11
    },
    searchBar: {
        backgroundColor: '#fff',
        height: 54,
        borderColor: '#eee',
        borderBottomWidth: 1,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchBar__text: {
        color: '#b2b2b2',
        fontSize: 14,
    },
    loader: {
        position: 'absolute',
        top: defaultheaderHeightConst + 54 + 10 + 27,
        left: '50%',
        marginLeft: -20,
        height: 40,
        width: 40,
        zIndex: 1000,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

const { width } = Dimensions.get('window')

const shadowOpt = {
    width: (width - 112 - 10),
    height: 36,
    color: "#000",
    border: 10,
    radius: 0,
    opacity: 0.1,
    x: 5,
    y: 0,
    style: { width: '100%', paddingVertical: 0, position: 'absolute', left: 56 }
}

const Header = ({ navigation }) => (
    <View style={{ width: '100%', height: '100%' }}>
        <View style={styles.header}>
            <View style={styles.headerLeftBtn}>
                <MenuButton />
            </View>

            <BoxShadow setting={shadowOpt} />
            <View style={styles.headerCenterBtn}>
                <AddressButton />
            </View>

            <View style={styles.headerRightBtn}>
                <DeliveryTimeButton />
            </View>
        </View>

        <View style={styles.searchBar}>
            <Text style={styles.searchBar__text}>Ресторан, блюдо или кухня...</Text>
        </View>
    </View>
);

const collapsibleParams = {
    extraHeader: Header,
    extraHeaderStyle: {
        height: defaultheaderHeightConst + 54 + 10,
    }
}

function mapStateToProps(state) {
    return {
        Categories: state.Categories,
        Restaurants: state.Restaurants,
        Popups: state.Popups
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getCategories, getRestaurants }, dispatch);
}

const screenWithCollapsible = withCollapsible(MainScreen, collapsibleParams);

export default connect(mapStateToProps, mapDispatchToProps)(screenWithCollapsible);