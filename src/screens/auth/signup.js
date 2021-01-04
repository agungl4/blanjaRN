import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Button, Label } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { IconBack } from '../../../src/assets'

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

class Signup extends React.Component {

    render() {
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
                        <Input placeholder='Regular Textbox'/>
                    </Item>
                    <Item floatingLabel>
                        <Label >Email</Label>
                        <Input placeholder='Regular Textbox'/>
                    </Item>
                    <Item floatingLabel>
                        <Label >Password</Label>
                        <Input placeholder='Regular Textbox' secureTextEntry={true} />
                    </Item>
                    <TouchableOpacity style={{flexDirection:'row-reverse'}} onPress={() => {
                        this.props.navigation.navigate('Login');
                    }}>
                        <Text> Already have an account?</Text>
                    </TouchableOpacity>
                    <Button danger full rounded style={{ marginTop: 15 }}><Text style={{ color: '#fff' }}> Login </Text></Button>
                </View>
            </Container>
        )
    }
}

export default Signup;