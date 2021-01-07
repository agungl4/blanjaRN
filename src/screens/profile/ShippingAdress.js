import React, { Component } from 'react';
import { Container, Header, Title, Content, Button, Left, Body, Text, Item, Input } from "native-base";
import { Image, View, TouchableOpacity, StyleSheet } from 'react-native'

import Nav from '../../components/BottomNav'
import CardAdress from '../../components/CardAdress'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

export default class Shipping extends React.Component {
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
                            <Title style={{ color: 'black', fontWeight: 'bold' }}>My Shipping Address</Title>
                        </Body>
                    </Header>
                    <Content style={{ backgroundColor: '#f0f0f0', margin: 10 }}>
                        <Item rounded style={{ marginTop: 20, backgroundColor: 'white' }}>
                            <Input placeholder="Search Here" />
                        </Item>
                        <View>
                            <Text style={{ marginTop: 20, marginLeft: 5, fontWeight: 'bold', fontSize: 18 }}>Shipping Address</Text>
                        </View>
                        <SafeAreaView>
                            <ScrollView style={{ height: 380, marginBottom: 20, marginTop: -20 }}>
                                <CardAdress navigation={this.props.navigation}/>
                                <CardAdress navigation={this.props.navigation}/>
                                <CardAdress navigation={this.props.navigation}/>
                            </ScrollView>
                        </SafeAreaView>

                        <Button full rounded bordered dark>
                            <TouchableOpacity
                                onPress={() => {this.props.navigation.navigate('AddAddress')}}
                            >
                                <Text>
                                    Add New Address
                            </Text>
                            </TouchableOpacity>
                        </Button>

                    </Content>
                    <Nav profile={true} navigation={this.props.navigation} />
                </Container>
            </>
        )
    }
}