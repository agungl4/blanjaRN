import React, { Component } from "react";
import { Container, Header, Title, Content, Button, Left, Body, Text, View, Item, Label, Input } from "native-base";
import { Image, StyleSheet, ToastAndroid } from 'react-native'
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from 'react-redux'
import axios from 'axios'
import { REACT_APP_BASE_URL } from "@env"

class AddAddress extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        address_type: '',
        recipient_name: '',
        address: '',
        city: '',
        postal: '',
        phone: '',
        errorForm: ''
    }

    addAddress = () => {
        const regexPhone = /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/g
        if(!(this.state.phone.length >=11) || !(this.state.phone.length <= 15) || !regexPhone.test(this.state.phone)){
            ToastAndroid.show('Format pengisian no. HP salah', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        }
        if (this.state.address_type !== '') {
            const addressData = {
                address_type: this.state.address_type,
                recipient_name: this.state.recipient_name,
                address: this.state.address,
                city: this.state.city,
                postal: this.state.postal,
                phone: this.state.phone,
                user_id: this.props.auth.id
            }
            axios.post(REACT_APP_BASE_URL + `/address/new`, addressData)
                .then(({ data }) => {
                    ToastAndroid.show(data.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                    this.props.navigation.navigate('Shipping')
                }).catch(({ response }) => {
                    console.log(response.data)
                })
        } else {
            this.setState({
                errorForm: 'Data tidak boleh kosong'
            })
        }
    }

    render() {
        const { address_type, recipient_name, address, city, postal, phone } = this.state
        console.log(this.state)
        console.log(this.props.auth)
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
                        <Label style={{ fontSize: 14, color: 'green' }}>Save address as (ex: home address, office address)</Label>
                        <Input value={address_type} onChangeText={(text) => { this.setState({ address_type: text }) }} />
                    </Item>
                    <Item floatingLabel style={styles.floatingLabel}>
                        <Label style={{ marginLeft: 10 }}>Recipient name</Label>
                        <Input name="email" value={recipient_name} onChangeText={(text) => { this.setState({ recipient_name: text }) }} />
                    </Item>
                    <View style={{ height: 195, width: 360, backgroundColor: 'white', borderRadius: 10, marginTop: 20 }}>
                        <Item floatingLabel style={{ marginTop: 10, marginLeft: 15, marginRight: 15 }}>
                            <Label style={{ fontSize: 14 }}>Address</Label>
                            <Input name="email" value={address} onChangeText={(text) => { this.setState({ address: text }) }} />
                        </Item>
                        <Item floatingLabel style={{ marginTop: 10, marginLeft: 15, marginRight: 15 }}>
                            <Label style={{ fontSize: 14, }}>City or Subdistrict</Label>
                            <Input name="email" value={city} onChangeText={(text) => { this.setState({ city: text }) }} />
                        </Item>
                        <Item floatingLabel style={{ marginTop: 10, marginLeft: 15, marginRight: 15 }}>
                            <Label style={{ fontSize: 14, }}>Postal Code</Label>
                            <Input name="email" value={postal} onChangeText={(text) => { this.setState({ postal: text }) }} />
                        </Item>
                    </View>
                    <View style={{ height: 75, width: 360, backgroundColor: 'white', borderRadius: 10, marginTop: 20, marginBottom: 20 }}>
                        <Item floatingLabel style={{ marginTop: 10, marginLeft: 15, marginRight: 15 }}>
                            <Label style={{ fontSize: 14, color: 'gray' }}>Recipient Telephone Number</Label>
                            <Input name="email" value={phone} onChangeText={(text) => { this.setState({ phone: text }) }} />
                        </Item>
                    </View>

                    <Button full rounded danger
                        onPress={this.addAddress}
                    >
                        <Text style={{ color: 'white' }}>
                            Save Address
                            </Text>
                    </Button>
                    <Text style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>{this.state.errorForm}</Text>
                </Content>

            </Container>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        auth
    };
};

export default connect(mapStateToProps)(AddAddress);

const styles = StyleSheet.create({
    floatingLabel: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 10,
        paddingTop: 5,
        paddingBottom: 10
    }
})