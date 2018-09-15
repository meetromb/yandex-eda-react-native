import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableNativeFeedback } from 'react-native';
import { withNavigation } from 'react-navigation';

class AddressButton extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableNativeFeedback
                    onPress={() => { }}
                    background={TouchableNativeFeedback.Ripple('#fff', true)}
                    useForeground={true}
                    style={{ borderRadius: 4 }}
                >
                    <Text style={styles.text}>Каменноостровский проспект, 10</Text>
                </TouchableNativeFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 46,
        paddingVertical: 10,
        width: '100%',
        borderRadius: 4,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    text: {
        color: '#000',
        fontFamily: 'ya_b',
        fontSize: 14,
    }
})

export default withNavigation(AddressButton);