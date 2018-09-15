import React, { Component } from 'react';
import { StyleSheet, View, TouchableNativeFeedback } from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

class MenuButton extends Component {
    render() {
        return (
            <View style={styles.circle}>
                <TouchableNativeFeedback
                    onPress={() => { this.props.navigation.openDrawer() }}
                    background={TouchableNativeFeedback.Ripple('#fff', true)}
                    style={{ borderRadius: 18 }}
                >
                    <View>
                        <Icon name="menu" style={{ color: '#000', fontSize: 25 }} />
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
        alignItems: 'center'
    }
})

export default withNavigation(MenuButton);