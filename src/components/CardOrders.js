import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

export default class cardOrder extends React.Component {
    render() {
        return (
            <>
                <TouchableOpacity style={styles.order}
                    onPress={() => {
                        this.props.navigation.navigate('DetailsOrders', {
                            trxId: this.props.trxId
                        })
                    }}
                >
                    <View style={{ margin: 10, }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                                Order No :
                                        <Text style={{ color: 'gray', }}> {this.props.trxId}</Text>
                            </Text>
                            <Text style={{ marginLeft: 55, color: '#2AA952' }}>{this.props.created_at.toString().substr(0, 10)}</Text>
                        </View>
                        <Text style={{ marginTop: 10, color: 'gray', fontSize: 14 }}>
                            Tracking Number :
                                        <Text style={{ fontWeight: 'bold', color: 'black' }}>{this.props.trackingNumber}</Text>
                        </Text>
                        <Text style={{ marginTop: 10, color: 'gray', fontSize: 14 }}>
                            Quantity :
                                        <Text style={{ color: 'black', fontWeight: 'bold' }} > {this.props.qty}</Text>
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ marginTop: 10, color: 'gray', fontSize: 14 }}>
                                Total Amount :
                                        <Text style={{ fontWeight: 'bold', color: 'black' }}> Rp. {this.props.total}</Text>
                            </Text>
                            <Text style={{ color: '#2AA952', fontSize: 14, fontWeight: 'bold', marginTop: 50}}>{this.props.status}</Text>
                        </View>
                    </View>
                </TouchableOpacity>

            </>
        )
    }
}

const styles = StyleSheet.create({
    order: {
        borderRadius: 10, height: 164,
        width: 340, backgroundColor: 'white',
        marginTop: 10,
        marginLeft: 10, marginRight: 10,
        marginBottom: 10,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.5,
        elevation: 6,
        shadowRadius: 15,
        shadowOffset: { width: 10, height: 10 }
    }
})