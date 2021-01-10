import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

export default class cardOrder extends React.Component {
    render() {
        return (
            <>
                <TouchableOpacity style={styles.order}>
                    <View style={{ margin: 10, }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: '200', fontSize: 18 }}>
                                Jane Doe
                            </Text>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('ChangeAddress')}
                            >
                                <Text style={{ marginLeft: 180, fontWeight: 'bold', color: 'red' }}>Change</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{ marginTop: 10, color: 'gray', fontSize: 14 }}>
                            3 Newbridge Curt
                        </Text>
                        <Text style={{ marginTop: 10, color: 'gray', fontSize: 14 }}>
                            Chino Hills, CA 91709, United States
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