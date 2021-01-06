import React, { Component } from 'react';
import { Container, Header, Title, Content, Button, Footer, FooterTab, Left, Body, Text, Right, List, ListItem } from "native-base";
import { Image, View, TouchableOpacity, StyleSheet } from 'react-native'

import Nav from './../../components/BottomNav'
import CardOrder from './../../components/CardOrders'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

export default class Orders extends React.Component {
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
                        <Body >
                            <Title style={{ color: 'black', marginLeft: 30, fontWeight: 'bold' }}>My Orders</Title>
                        </Body>

                    </Header>
                    <Content style={{ backgroundColor:'#f0f0f0' }}>
                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 42, marginLeft: 15, marginRight: 10, marginTop: 20, marginBottom: 10 }}>My Orders</Text>
                        </View>
                        <SafeAreaView>
                            <ScrollView style={{ height: 480 }}>
                                <CardOrder navigation={this.props.navigation} />
                                <CardOrder navigation={this.props.navigation} />
                                <CardOrder navigation={this.props.navigation} />
                                <CardOrder navigation={this.props.navigation} />
                            </ScrollView>
                        </SafeAreaView>
                    </Content>
                    <Nav profile={true} navigation={this.props.navigation} />
                </Container>
            </>
        )
    }
}

