import React, { Component } from 'react';
import { Container, Header, Title, Content, Button, Left, Body, Text, Right } from "native-base";
import { Image, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { setLoginfalse, removeEmail, removeId, removeName } from './../../utils/redux/ActionCreators/auth'
import { REACT_APP_BASE_URL } from "@env"

class UserStore extends React.Component {
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
                        <Text style={{ fontWeight: 'bold', fontSize: 42, marginLeft: 10, marginRight: 10 }}>My Store</Text>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Image source={require('./../../assets/images/profile.jpg')} style={{ width: 80, height: 80, borderRadius: 40, marginLeft: 10, marginRight: 10, marginBottom: 50 }} />
                            <View style={{ paddingLeft: 10, marginTop: 5 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Store Name</Text>
                                <Text style={{ color: 'gray' }}>owner name</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={{ borderBottomColor: 'gray', borderBottomWidth: 0.2, marginLeft: 10, marginRight: 40 }}
                            onPress={() => { this.props.navigation.navigate('ListProduct') }}
                        >
                            <View style={{ paddingLeft: 10, marginTop: 5 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>My selling product</Text>
                                <Text style={{ color: 'gray', marginBottom: 10 }}>Manage your store products here</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ borderBottomColor: 'gray', borderBottomWidth: 0.2, marginLeft: 10, marginRight: 40 }}
                            onPress={() => { this.props.navigation.navigate('AddProduct') }}
                        >
                            <View style={{ paddingLeft: 10, marginTop: 5 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>Add products</Text>
                                <Text style={{ color: 'gray', marginBottom: 10 }}>Already 12 orders</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ borderBottomColor: 'gray', borderBottomWidth: 0.2, marginLeft: 10, marginRight: 40 }}
                            onPress={() => { this.props.navigation.navigate('AddStock') }}>
                            <View style={{ paddingLeft: 10, marginTop: 5 }}
                            >
                                <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>Add stock</Text>
                                <Text style={{ color: 'gray', marginBottom: 10 }}>3 Shipping Adress</Text>
                            </View>
                        </TouchableOpacity>
                    </Content>
                </Container>
            </>
        )
    }
}

export default UserStore;