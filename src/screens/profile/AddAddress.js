import React, { Component } from "react";
import { Container, Header, Title, Content, Button, Left, Body, Text, View, Item, Label, Input } from "native-base";
import { Image, StyleSheet } from 'react-native'
import Nav from '../../components/BottomNav'
import { TouchableOpacity } from "react-native-gesture-handler";

export default class HeaderTransparent extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Container >
                <Header transparent>
                    <Left>
                        <Button transparent
                            onPress={() => { this.props.navigation.goBack() }}
                        >
                            <Image source={require('../../assets/icons/back.png')} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: 'black', fontWeight: 'bold' }}>Add Shipping Address</Title>
                    </Body>
                </Header>
                <Content style={{ backgroundColor: '#f0f0f0', margin: 10 }}>
                    <View
                        style={{ marginBottom: 10 }}
                    >
                    </View>
                    <Item floatingLabel style={styles.floatingLabel}>
                        <Label style={{ marginLeft: 10 }}>Address type</Label>
                        <Input />
                    </Item>
                    <Item floatingLabel style={styles.floatingLabel}>
                        <Label style={{ marginLeft: 10 }}>Fullname</Label>
                        <Input />
                    </Item>
                    <Item floatingLabel style={styles.floatingLabel}>
                        <Label style={{ marginLeft: 10 }}>Address</Label>
                        <Input />
                    </Item>
                    <Item floatingLabel style={styles.floatingLabel}>
                        <Label style={{ marginLeft: 10 }}>City or Subdistrict</Label>
                        <Input />
                    </Item>
                    <Item floatingLabel style={styles.floatingLabel}>
                        <Label style={{ marginLeft: 10 }}>Postal/Zip Code</Label>
                        <Input />
                    </Item>
                    <Item floatingLabel style={styles.floatingLabel}>
                        <Label style={{ marginLeft: 10 }}>Phone Number</Label>
                        <Input />
                    </Item>
                    <Button full rounded danger style={{ marginTop: 20 }}>
                        <TouchableOpacity
                            onPress={() => { this.props.navigation.navigate('Shipping') }}
                        >
                            <Text>Save Address</Text>
                        </TouchableOpacity>
                    </Button>
                </Content>
               
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    floatingLabel: {
        backgroundColor: 'white',
        borderRadius:10,
        marginTop: 10,
        paddingTop: 5,
        paddingBottom: 10
    }
})