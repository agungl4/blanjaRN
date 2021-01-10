import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Button, Label } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { IconBack } from '../../assets'

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

class Forgot extends React.Component {

    render() {
        return (
            <Container style={styles.container}>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate('Home');
                }}>
                    <Image source={IconBack} />
                </TouchableOpacity>
                <View style={styles.rowTitle}>
                    <Text style={styles.textTitle}>Forgot password</Text>
                </View>

                <View style={{ marginTop: 73 }}>
                    <View>
                        <Text>Please enter your email address. You will receive a link to create a new password via email</Text>
                    </View>
                    <Item floatingLabel>
                        <Label >Email</Label>
                        <Input placeholder='Regular Textbox' />
                    </Item>
                    <Button danger full rounded style={{ marginTop: 15 }}><Text style={{ color: '#fff' }}> SEND </Text></Button>
                </View>
            </Container>
        )
    }
}

export default Forgot;