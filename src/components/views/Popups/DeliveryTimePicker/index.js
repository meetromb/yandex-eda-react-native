import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { WheelPicker } from 'react-native-wheel-picker-android';
import { StylesConst } from '../../../../utils/styles';

const dataDate = ['Сегодня', 'Завтра'];

const dataTime = ['8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00',
    '21:30', '22:00', '22:30', '23:00', '23:30', '00:00', '00:30', '01:00'];

class DeliveryTimePicker extends Component {
    render() {
        return (
            <View style={styles.container}>
                <WheelPicker
                    //onItemSelected={(event)=>this.onItemSelected(event)}
                    itemTextColor={'#bdbdbd'}
                    itemTextSize={30}
                    itemTextFontFamily={'ya_r'}
                    isAtmospheric={true}
                    visibleItemCount={7}
                    backgroundColor={'white'}
                    selectedItemTextColor={'black'}
                    data={dataDate}
                    style={styles.datePicker}
                />

                <WheelPicker
                    //onItemSelected={(event)=>this.onItemSelected(event)}
                    itemTextColor={'#bdbdbd'}
                    itemTextSize={30}
                    itemTextFontFamily={'ya_r'}
                    isAtmospheric={true}
                    visibleItemCount={7}
                    backgroundColor={'white'}
                    selectedItemTextColor={'black'}
                    data={dataTime}
                    style={styles.timePicker}
                />

                <View style={styles.button}>
                    <Text style={styles.buttonText}>Выбрать</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 264,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 120,
        position: 'absolute',
        bottom: 0,
        left: 0,
        paddingHorizontal: 8
    },
    timePicker: {
        height: 204,
        width: '30%',
        position: 'absolute',
        bottom: 55,
        right: 20
    },
    datePicker: {
        height: 204,
        width: '30%',
        position: 'absolute',
        bottom: 55,
        left: 20
    },
    button: {
        position: 'absolute',
        bottom: 8,
        left: 8,
        height: 48,
        width: '100%',
        borderRadius: 4,
        backgroundColor: StylesConst.accentColor,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#000',
        fontFamily: 'ya_b',
        fontSize: 16
    }
})

export default DeliveryTimePicker;