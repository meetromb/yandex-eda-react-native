import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Image, Animated } from 'react-native';
import ViewOverflow from 'react-native-view-overflow';
import FastImage from 'react-native-fast-image'
import { StylesConst } from '../../../../utils/styles';

const padding = 0;
const borderRadius = 0;

const AnimatedViewOverflow = Animated.createAnimatedComponent(ViewOverflow);
const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

class RestaurantListItem extends PureComponent {
    constructor(props) {
        super(props);
    }

    _getDeliveryIcon = () => {
        if (this.props.data.yandexDelivery) {
            return (
                <View style={styles.deliveryIcon}>
                    <Image
                        resizeMode={'cover'}
                        style={{ height: '100%', width: '100%' }}
                        source={require('../../../../../assets/images/ui/deliveryIcon.png')}
                    />
                </View>
            )
        }
    }

    _getRating = () => {
        if (!this.props.data.new && !this.props.data.lowRating) {
            return (
                <View style={[styles.ratingIconContainer, { backgroundColor: 'transparent' }]}>
                    <Image
                        style={styles.ratingIconStar}
                        resizeMode={'cover'}
                        source={require('../../../../../assets/images/ui/emptyStar.png')}
                    />
                    <Text style={styles.ratingIconText}>{this.props.data.rating}</Text>
                </View>
            )
        } else if (this.props.data.lowRating) {
            return (
                <View style={[styles.ratingIconContainer, { backgroundColor: 'transparent' }]}>
                    <Image
                        style={styles.ratingIconStar}
                        resizeMode={'cover'}
                        source={require('../../../../../assets/images/ui/emptyStar.png')}
                    />
                    <Text style={styles.ratingIconText}>Мало оценок</Text>
                </View>
            )
        } else if (this.props.data.new) {
            return (
                <View style={[styles.ratingIconContainer]}>
                    <Text style={styles.ratingIconText}>Новый</Text>
                </View>
            )
        }
    }

    _getCategories = () => (
        this.props.data.categoriesNames.map((item, i) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }} key={i}>
                <Text style={styles.restFooterCategoryText}>{item}</Text>
                <View style={styles.restFooterCategorySeparator} />
            </View>
        ))
    )

    render() {
        if (this.props.animateTransition) {
            padding = this.props.animateTransition.interpolate({
                inputRange: [0, 1],
                outputRange: [this.props.startPadding, this.props.endPadding],
            });

            borderRadius = this.props.animateTransition.interpolate({
                inputRange: [0, 1],
                outputRange: [8, 0],
            });
        } else {
            padding = this.props.startPadding ? this.props.startPadding : 0;
            borderRadius = this.props.radius ? this.props.radius : 0;
        }

        return (
            <Animated.View style={[styles.container, {paddingHorizontal: padding}]}>
                <AnimatedViewOverflow style={[styles.restImageContainer, {borderRadius: borderRadius}]}>
                    <AnimatedFastImage
                        style={[styles.restImage, {borderRadius: borderRadius}]}
                        source={{ uri: this.props.data.bg }}
                    />

                    <View style={styles.restDeliveryTime}>
                        <Text style={styles.restDeliveryTimeTitle}>20 — 30</Text>
                        <Text style={styles.restDeliveryTimeSubitle}>мин</Text>
                    </View>
                </AnimatedViewOverflow>

                <View style={styles.restFooter}>
                    <Text style={styles.restTitle}>{this.props.data.name}</Text>

                    <View style={styles.restFooterIcons}>
                        {this._getDeliveryIcon()}
                        {this._getRating()}

                        <View style={styles.orderIconContainer}>
                            <Image
                                style={styles.orderIconBag}
                                resizeMode={'contain'}
                                source={require('../../../../../assets/images/ui/package.png')}
                            />
                            <Text style={styles.orderIconText}>Заказ от {this.props.data.minOrderPrice} ₽</Text>
                        </View>
                    </View>

                    <View style={styles.restFooterCategory}>
                        {this._getCategories()}
                        <Text style={styles.restFooterCategoryText}>₽</Text>
                    </View>
                </View>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 30
    },
    restImageContainer: {
        height: 170,
        width: '100%',
        //borderRadius: 8,
    },
    fallbackImage: {
        backgroundColor: '#f5f5f5',
        height: 185,
        width: 185,
        //borderRadius: 8
    },
    restImage: {
        height: '100%',
        width: '100%',
        //borderRadius: 8
    },
    restFooter: {
        marginTop: 12
    },
    restTitle: {
        fontSize: 20,
        fontFamily: 'ya_b',
        color: '#000',
        paddingLeft: 1
    },
    restDeliveryTime: {
        position: 'absolute',
        bottom: -21,
        right: 15,
        height: 43,
        width: 94,
        backgroundColor: '#fff',
        borderRadius: 22,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    restDeliveryTimeTitle: {
        color: '#000',
        fontSize: 17,
        fontFamily: 'ya_b'
    },
    restDeliveryTimeSubitle: {
        fontSize: 14,
        fontFamily: 'ya_r',
        color: '#bebebe'
    },
    deliveryIcon: {
        height: 22,
        width: 31,
        marginRight: 16
    },
    restFooterIcons: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 6
    },
    ratingIconContainer: {
        height: 23,
        backgroundColor: StylesConst.accentColor,
        borderRadius: 11.5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingIconStar: {
        height: 17,
        width: 18
    },
    ratingIconText: {
        fontSize: 13.5,
        color: '#000',
        fontFamily: 'ya_r',
        marginLeft: 6
    },
    orderIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 23,
        marginLeft: 16,
    },
    orderIconBag: {
        height: 18.2,
        width: 14
    },
    orderIconText: {
        fontSize: 13.5,
        color: '#000',
        fontFamily: 'ya_r',
        marginLeft: 7
    },
    restFooterCategory: {
        //flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8
    },
    restFooterCategoryText: {
        fontSize: 14,
        fontFamily: 'ya_r',
        color: '#bebebe'
    },
    restFooterCategorySeparator: {
        height: 2,
        width: 2,
        borderRadius: 1,
        backgroundColor: '#bebebe',
        marginLeft: 7,
        marginRight: 7,
        marginTop: 2.5
    }
});

export default RestaurantListItem;