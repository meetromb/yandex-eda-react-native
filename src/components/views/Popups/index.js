import React, { Component } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Animated } from 'react-native';
import { connect } from "react-redux";

import { updatePopup } from '../../store/actions/popups_actions';
import { bindActionCreators } from 'redux';
import DeliveryTimePicker from './DeliveryTimePicker';

const AnimatedDeliveryTimePicker = Animated.createAnimatedComponent(DeliveryTimePicker);

class PopupComponent extends Component {
    state = {
        fadeAnim: new Animated.Value(0)
    }

    _resetAnim() {
        this.setState({
            fadeAnim: new Animated.Value(0)
        });
    }

    componentDidUpdate() {
        if (this.props.Popups.popups['delivery']) {
            Animated.timing(this.state.fadeAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true
            }).start();
        }
    }

    render() {
        return (
            <View style={[
                styles.overlayContainer,
                this.props.Popups.popups['delivery'] ? { height: '100%' } : { height: 0 }
            ]}>
                <TouchableWithoutFeedback onPress={() => {
                    this.props.updatePopup('delivery', !this.props.Popups.popups['delivery']);
                    this._resetAnim();
                }}>
                    <Animated.View style={[styles.overlay, { opacity: this.state.fadeAnim }]} />
                </TouchableWithoutFeedback>

                <AnimatedDeliveryTimePicker style={{
                    transform: [{
                        translateY: this.state.fadeAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [264, 0]
                        })
                    }]
                }} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    overlayContainer: {
        position: "absolute",
        height: '100%',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    overlay: {
        position: "absolute",
        backgroundColor: 'rgba(0,0,0,0.2)',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }
})

function mapStateToProps(state) {
    return {
        Popups: state.Popups
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ updatePopup }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PopupComponent);