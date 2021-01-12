import React, { Component } from 'react';
import { Container, Header, Title, Content, Button, Left, Body, Text, Item, Input, CheckBox } from "native-base";
import { Image, View, TouchableOpacity, StyleSheet } from 'react-native'
import CardAdress from '../components/CardAdress'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

export default class Shipping extends React.Component {
    state = {
        isChecked: true
    }
    render() {
        return (
            <>
                <Container>
                    <Header transparent>
                        <Left>
                            <Button transparent
                                onPress={() => { this.props.navigation.goBack() }}
                            >
                                <Image source={require('../assets/icons/back.png')} />
                            </Button>
                        </Left>
                        <Body >
                            <Title style={{ color: 'black',marginLeft:35, fontWeight: 'bold' }}>CheckOut</Title>
                        </Body>
                    </Header>
                    <Content style={{ backgroundColor: '#f0f0f0' }}>
                        <View style={{ margin: 10 }}>
                            <Text style={{ marginTop: 20, marginLeft: 5, fontWeight: 'bold', fontSize: 18 }}>Shipping Address</Text>
                            <CardAdress navigation={this.props.navigation} />
                            <Text style={{ marginTop: 20, marginLeft: 5, fontWeight: 'bold', fontSize: 18 }}>Payment</Text>
                            <View style={{ flexDirection: 'row', marginRight: 10, height: 60, }}>
                                <Image source={require('../assets/images/card.png')} />
                                <Text style={{ marginTop: 30,width:120 }}>Master Card</Text>
                                <CheckBox style={{ marginLeft: 70, marginTop: 30 }} checked={this.state.isChecked}  onPress={() => { this.setState({ isChecked: !this.state.isChecked }) }} />
                            </View>
                            <View style={{ flexDirection: 'row', marginRight: 10, height: 60, }}>
                                <Image source={require('../assets/images/card.png')} />
                                <Text style={{ marginTop: 30,width:120 }}>Post Indonesia</Text>
                                <CheckBox style={{ marginLeft: 70, marginTop: 30 }}  />
                            </View><View style={{ flexDirection: 'row', marginRight: 10, height: 60, }}>
                                <Image source={require('../assets/images/card.png')} />
                                <Text style={{ marginTop: 30,width:120 }}>GoPay</Text>
                                <CheckBox style={{ marginLeft: 70, marginTop: 30 }} />
                            </View>
                        </View>



                        <View style={{ backgroundColor: 'white', height: 190, marginTop:50, borderTopEndRadius:10, borderTopLeftRadius:10 }}>
                            <View style={{ flexDirection: 'row', margin:10}}>
                                <Text style={{width:100, color:'gray'}}>Order :</Text>
                                <Text style={{marginLeft:200}}>112$</Text>
                            </View>
                            <View style={{ flexDirection: 'row', margin:10}}>
                                <Text style={{width:100, color:'gray'}}>Shipping :</Text>
                                <Text style={{marginLeft:200}}>15$</Text>
                            </View>
                            <View style={{ flexDirection: 'row', margin:10,}}>
                                <Text style={{width:100, color:'gray'}}>Summary :</Text>
                                <Text style={{marginLeft:200, fontWeight:'bold', fontSize:18}}>127$</Text>
                            </View>
                            <Button full rounded danger style={{margin:10}}>
                                <TouchableOpacity
                                    onPress={() => { this.props.navigation.navigate('Success') }}
                                >
                                    <Text style={{ color: 'white' }}>
                                        Submit Order
                            </Text>
                                </TouchableOpacity>
                            </Button>
                        </View>

                    </Content>
                </Container>
            </>
        )
    }
}