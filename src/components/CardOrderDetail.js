import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

class CardBag extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../assets/images/image.png')} style={styles.img} />
                <View style={styles.infobag}>
                    <Text
                        style={{ fontSize: 18, fontWeight: 'bold', marginBottom:5, marginTop:10 }}
                    >
                        Product Name
                        </Text>
                    <Text style={{color:'gray',marginBottom:10}}>OVS</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ marginRight: 16 , color:'gray'}}>Color: 
                        <Text style={{color:'black'}}>Gray</Text>
                        </Text>
                        <Text>Size: L</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Text style={{ color:'gray'}}>Unit : 
                        <Text style={{color:'black'}}>1</Text>
                        </Text>
                        <View style={styles.price}>
                            <Text style={{ fontFamily: 'Metropolis-Bold',fontWeight:'bold', fontSize: 20, marginLeft:80, marginTop:-10 }}>30$</Text>
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
        height:120,
        marginBottom:20,
        
    },
    price: {
        marginTop: 7,
        marginLeft: 50,
    },
    img: {
        
        width: 104,
        height: 120,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    infobag: {
        backgroundColor: '#fff',
        width: 235,
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