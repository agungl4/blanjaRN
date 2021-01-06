import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { IconMin, IconPlus } from '../assets/index.js';

class CardBag extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../assets/images/cardbag.png')} style={styles.img} />
                <View style={styles.infobag}>
                    <Text>T-Shirt</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ marginRight: 16 }}>Color: Gray</Text>
                        <Text>Size: L</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 14 }}>
                        <View style={styles.btn}>
                            <Image source={require('../assets/icons/min.png')} style={{marginTop:13}}/>
                        </View>
                        <Text style={{ marginTop: 7, marginHorizontal: 10 }}>1</Text>
                        <View style={styles.btn}>
                            <Image source={require('../assets/icons/plus.png')} style={{marginTop:6}}/>
                        </View>
                        <View style={styles.price}>
                            <Text style={{ fontFamily: 'Metropolis-Bold', fontSize: 20 }}>30$</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

export default CardBag;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    price: {
        marginTop: 7,
        marginLeft: 50,
    },
    btn: {
        width: 36,
        height: 36,
        borderWidth: 1,
        borderRadius: 36 / 2,
        alignItems: 'center',
        paddingTop: 4,
        borderColor: '#9B9B9B',
    },
    img: {
        width: 104,
        height: 104,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    infobag: {
        backgroundColor: '#fff',
        width: 220,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
        paddingHorizontal: 5,
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
    },
});