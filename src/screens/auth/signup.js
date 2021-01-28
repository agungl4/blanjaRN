import React from 'react'
import { View, Text, StyleSheet, Image, ToastAndroid } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Button, Label, Body, Left, Right } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { IconBack } from '../../assets'
import { REACT_APP_BASE_URL } from "@env"
import axios from 'axios'
const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
class Signup extends React.Component {
    state = {
        isRegister: false,
        fullname: '',
        email: '',
        password: '',
        store: '',
        errorForm: '',
        btnState: false,
    }


    signup = () => {
        if (this.state.fullname === '' || this.state.email === '' || this.state.password === '') {
            this.setState({
                errorForm: 'Semua kolom harus diisi'
            })
        } else {
            if (regexEmail.test(this.state.email)) {
                let data = {
                    email: this.state.email,
                    fullname: this.state.fullname,
                    password: this.state.password,
                }
                if (this.state.btnState) {
                    data = {
                        ...data,
                        level_id: 2,
                        store: this.state.store
                    }
                } else {
                    data = {
                        ...data,
                        level_id: 1,
                        store: ''
                    }
                }
                console.log(data)
                axios.post(REACT_APP_BASE_URL + '/auth/signup', data)
                    .then(({ data }) => {
                        this.setState({
                            errorForm: ''
                        })
                        console.log(data)
                        ToastAndroid.show(data.message, ToastAndroid.SHORT, ToastAndroid.CENTER);
                        this.props.navigation.navigate('Activation')
                    }).catch((error) => {
                        console.log(error.response.data.msg)
                        ToastAndroid.show(response.data.message, ToastAndroid.SHORT, ToastAndroid.CENTER);
                    })
            } else {
                ToastAndroid.show('Format email tidak valid', ToastAndroid.SHORT)
            }
        }
    }

    render() {
        let { email, fullname, password, btnState, store } = this.state
        console.log(this.state)
        let btnText
        let formState
        if (!btnState) {
            btnText = <Text style={{ color: '#d9534f' }}> Customer </Text>
            formState = <>
                <Item floatingLabel>
                    <Label >Name</Label>
                    <Input name="fullname" value={fullname} onChangeText={(text) => { this.setState({ fullname: text }) }} />
                </Item>
                <Item floatingLabel>
                    <Label >Email</Label>
                    <Input name="username" value={email} onChangeText={(text) => { this.setState({ email: text }) }} />
                </Item>
                <Item floatingLabel>
                    <Label >Password</Label>
                    <Input name="password" value={password} onChangeText={(text) => { this.setState({ password: text }) }} secureTextEntry={true} />
                </Item>
            </>
        } else {
            btnText = <Text style={{ color: '#d9534f' }}> Seller </Text>
            formState = <>
                <Item floatingLabel>
                    <Label >Name</Label>
                    <Input name="fullname" value={fullname} onChangeText={(text) => { this.setState({ fullname: text }) }} />
                </Item>
                <Item floatingLabel>
                    <Label >Email</Label>
                    <Input name="username" value={email} onChangeText={(text) => { this.setState({ email: text }) }} />
                </Item>
                <Item floatingLabel>
                    <Label >Store Name</Label>
                    <Input name="store" value={store} onChangeText={(text) => { this.setState({ store: text }) }} />
                </Item>
                <Item floatingLabel>
                    <Label >Password</Label>
                    <Input name="password" value={password} onChangeText={(text) => { this.setState({ password: text }) }} secureTextEntry={true} />
                </Item>
            </>
        }
        return (
            <Container style={styles.container}>
                <Header transparent>
                    <Left>
                        <Button transparent
                            onPress={() => { this.props.navigation.goBack() }}
                        >
                            <Image source={IconBack} />
                        </Button>
                    </Left>
                    <Body></Body>
                    <Right></Right>
                </Header>

                <Content>
                    <View style={styles.rowTitle}>
                        <Text style={styles.textTitle}>Signup</Text>
                    </View>
                    <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'center', }}>
                        <View></View>
                        <View><Text > Register as </Text></View>
                        <View></View>
                    </View>
                    <View style={styles.btnWrap}>
                        <Button bordered danger full style={styles.btnSelector} onPress={() => { this.setState({ btnState: !btnState }) }}>
                            {btnText}
                        </Button>
                    </View>
                    <View style={{ marginTop: 15 }}>

                        {formState}

                        <TouchableOpacity style={{ flexDirection: 'row-reverse' }} onPress={() => {
                            this.props.navigation.navigate('Login');
                        }}>
                            <Text> Already have an account?</Text>
                        </TouchableOpacity>
                        <Button danger full rounded style={{ marginTop: 15 }} onPress={this.signup}>
                            <Text style={{ color: '#fff' }}> SIGN UP </Text>
                        </Button>
                        <TouchableOpacity style={{ flexDirection: 'row-reverse', marginTop: 10, marginBottom: 25 }}
                            onPress={() => {
                                this.props.navigation.navigate('Activation')
                            }}
                        >
                            <Text style={{ fontWeight: 'bold' }}>Already register? Activate your account here -{'>'}</Text>
                        </TouchableOpacity>
                        <Text style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}>{this.state.errorForm}</Text>
                    </View>
                </Content>
            </Container>
        )
    }
}

export default Signup;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
    },
    rowTitle: {
        marginTop: 5
    },
    textTitle: {
        fontSize: 34,
        fontWeight: 'bold'
    },
    btnWrap: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 5
    },
    btnSelector: {
        width: 100,
        borderRadius: 8
    },
    btnText: {
        color: '#fff',
        textAlign: 'center'
    }
})