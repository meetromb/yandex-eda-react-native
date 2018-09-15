import React, { Component } from 'react';
import { StyleSheet, View, TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { updatePopup } from '../../../store/actions/popups_actions';

class DeliveryTimeButton extends Component {
    render() {
        return (
            <View style={styles.circle}>
                <TouchableNativeFeedback
                    onPress={() => { this.props.updatePopup('delivery', !this.props.Popups.popups['delivery']) }}
                    background={TouchableNativeFeedback.Ripple('#fff', true)}
                    style={{ borderRadius: 18 }}
                >
                    <View>
                        <Icon name="access-time" style={{ color: '#000', fontSize: 25 }} />
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    circle: {
        height: 36,
        width: 36,
        borderRadius: 18,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryTimeButton);