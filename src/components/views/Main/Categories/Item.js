import React, { Component } from 'react';
import { StyleSheet, View, Text, Animated, TouchableWithoutFeedback, Easing } from 'react-native';
import FastImage from 'react-native-fast-image'

const imagesList = {
    'burger': require('../../../../../assets/images/icons/categories/burger.png'),
    'sushi': require('../../../../../assets/images/icons/categories/sushi.png'),
    'pizza': require('../../../../../assets/images/icons/categories/pizza.png'),
    'healthy': require('../../../../../assets/images/icons/categories/healthy.png'),
    'italian': require('../../../../../assets/images/icons/categories/italian.png'),
    'steak': require('../../../../../assets/images/icons/categories/steak.png'),
    'georgian': require('../../../../../assets/images/icons/categories/georgian.png'),
    'fish': require('../../../../../assets/images/icons/categories/fish.png')
}

class CategoryListItem extends Component {
    state = {
        animatedScale: new Animated.Value(0),   //item scale
        transformAnim: new Animated.Value(0)
    }

    _onPressItem = () => {
        this.props.onPress(this.props.data.id);

        this.state.animatedScale.setValue(0);   //reset scale

        Animated.timing(this.state.animatedScale, {
            toValue: 1,
            duration: 500,
            easing: Easing.bezier(.06, 1.46, .98, 1.0),
            useNativeDriver: true
        }).start();
    }

    componentDidMount() {
        Animated.timing(this.state.transformAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();
    }

    render() {
        let { animatedScale } = this.state;

        return (
            <Animated.View 
                style={[
                    styles.item,
                    {transform: [{
                        translateX: this.state.transformAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [50 + this.props.listPosition * 50, 0]
                        })
                    }]}
                ]}
            >

                <TouchableWithoutFeedback onPress={this._onPressItem}>
                    <Animated.View
                        style={[
                            styles.iconContainer,
                            { backgroundColor: this.props.backgroundColor },
                            { borderWidth: this.props.borderWidth },
                            {
                                transform: [
                                    {
                                        scaleX: animatedScale.interpolate({
                                            inputRange: [0, 0.5, 1],
                                            outputRange: [1, 1.15, 1]
                                        })
                                    },
                                    {
                                        scaleY: animatedScale.interpolate({
                                            inputRange: [0, 0.5, 1],
                                            outputRange: [1, 1.15, 1]
                                        })
                                    }
                                ]
                            }
                        ]}
                    >
                        <FastImage
                            style={{ width: 33, height: 33 }}
                            source={imagesList[this.props.data.icon]}
                        />
                    </Animated.View>
                </TouchableWithoutFeedback>

                <View style={styles.textContainer}>
                    <Text style={styles.text}>{this.props.data.name}</Text>
                </View>

            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        paddingTop: 25,
        paddingBottom: 31,
        paddingLeft: 8,
        paddingRight: 8,
        flexDirection: 'column',
        alignItems: 'center',
    },
    iconContainer: {
        backgroundColor: '#fff',
        height: 68,
        width: 70,
        borderColor: '#f1f1f1',
        borderWidth: 0.5,
        borderRadius: 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textContainer: {
        marginTop: 3.5
    },
    text: {
        color: '#bebebe',
        fontSize: 12,
        fontFamily: 'ya_r'
    }
})

export default CategoryListItem;