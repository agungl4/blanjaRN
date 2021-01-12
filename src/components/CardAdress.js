import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

export default class cardOrder extends React.Component {
    render() {
        return (
            <>
                <TouchableOpacity style={styles.order} key={this.props.addressId}>
                    <View style={{ margin: 10, }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontWeight: '200', fontSize: 18 }}>
                                {this.props.name}
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate('ChangeAddress', {
                                        addressId: this.props.addressId,
                                    })
                                }}
                            >
                                <Text style={{ marginRight: 10, fontWeight: 'bold', color: 'red' }}>Change</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{ marginTop: 10, color: 'gray', fontSize: 14 }}>
                            {this.props.city + ', '}<Text style={{ color: 'green', fontWeight: 'bold' }}>{this.props.postal}</Text>
                        </Text>
                        <Text style={{ marginTop: 10, color: 'gray', fontSize: 14 }}>
                            {this.props.phone}
                        </Text>
                    </View>
                </TouchableOpacity>

            </>
        )
    }
}

const styles = StyleSheet.create({
    order: {
        borderRadius: 10, height: 105,
        width: 328, backgroundColor: 'white',
        marginTop: 7,
        marginLeft: 5, marginRight: 10,
        marginBottom: 7,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.5,
        elevation: 6,
        shadowRadius: 15,
        shadowOffset: { width: 10, height: 10 }
    }
})