import React, { Component } from 'react';
import { Container, Header, Title, Content, Button, Left, Body, Text, Right } from "native-base";
import { Image, View, TouchableOpacity } from 'react-native'


import Nav from '../../components/BottomNav'

export default class Profile extends React.Component {
    constructor(props) {
        super(props)
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
                                <Image source={require('./../../assets/icons/back.png')} />
                            </Button>
                        </Left>
                        <Body />
                        <Right>
                            <Button transparent>
                                <Image source={require('./../../assets/icons/Search.png')} />
                            </Button>
                        </Right>
                    </Header>
                    <Content>
                        <Text style={{ fontWeight: 'bold', fontSize: 42, marginLeft: 10, marginRight: 10 }}>My Profile</Text>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Image source={require('./../../assets/images/profile.jpg')} style={{ width: 80, height: 80, borderRadius: 40, marginLeft: 10, marginRight: 10, marginBottom: 50 }} />
                            <View style={{ paddingLeft: 10, marginTop: 5 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Matilda Brown</Text>
                                <Text style={{ color: 'gray' }}>MatildaBrown@mail.com</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={{ borderBottomColor: 'gray', borderBottomWidth: 0.2, marginLeft: 10, marginRight: 40 }}
                            onPress={() => { this.props.navigation.navigate('Orders') }}
                        >
                            <View style={{ paddingLeft: 10, marginTop: 5 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>My Orders</Text>
                                <Text style={{ color: 'gray', marginBottom: 10 }}>Already 12 orders</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ borderBottomColor: 'gray', borderBottomWidth: 0.2, marginLeft: 10, marginRight: 40 }}
                            onPress={() => { this.props.navigation.navigate('Shipping') }}>
                            <View style={{ paddingLeft: 10, marginTop: 5 }}
                            >
                                <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>Shipping Adress</Text>
                                <Text style={{ color: 'gray', marginBottom: 10 }}>3 Shipping Adress</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ borderBottomColor: 'gray', borderBottomWidth: 0.2, marginLeft: 10, marginRight: 40 }}
                            onPress={() => { this.props.navigation.navigate('Setting') }}
                        >

                            <View style={{ paddingLeft: 10, marginTop: 5 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>Settings</Text>
                                <Text style={{ color: 'gray', marginBottom: 10 }}>Notification, Password</Text>
                            </View>
                        </TouchableOpacity>
                    </Content>
                    <Nav navigation={this.props.navigation} profile={true} />
                </Container>
            </>
        )
    }
}