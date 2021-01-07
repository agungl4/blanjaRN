import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Button, Label } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { IconBack } from '../../assets'
import { REACT_APP_BASE_URL } from "@env"

class Signup extends React.Component {
    state = {
        username: '',
        email: '',
        fullname: '',
        password: '',
    }

    signup = () => {
        const data = {
            username: this.state.email,
            fullname: this.state.fullname,
            password: this.state.password,
            level_id: 1,
            email: this.state.email
        }
        console.log(data)
        axios.post(REACT_APP_BASE_URL + '/auth/signup', data)
            .then(({ data }) => {
                alert('Register Berhasil')
                this.props.navigation.navigate('Login')
            }).catch((error) => {
                alert('gagal')
            })
    }

    render() {
        let { username, fullname, password } = this.state
        console.log(this.state)
        return (
            <Container style={styles.container}>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate('Home');
                }}>
                    <Image source={IconBack} />
                </TouchableOpacity>
                <View style={styles.rowTitle}>
                    <Text style={styles.textTitle}>Signup</Text>
                </View>
                <View style={{ marginTop: 73 }}>
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
                    <TouchableOpacity style={{ flexDirection: 'row-reverse' }} onPress={() => {
                        this.props.navigation.navigate('Login');
                    }}>
                        <Text> Already have an account?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.signup}>
                        <Button danger full rounded style={{ marginTop: 15 }}>
                            <Text style={{ color: '#fff' }}> Submit </Text>
                        </Button>
                    </TouchableOpacity>
                </View>
            </Container>
        )
    }
}

export default Signup;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingTop: 25
    },
    rowTitle: {
        marginTop: 34
    },
    textTitle: {
        fontSize: 34,
        fontWeight: 'bold'
    },
})