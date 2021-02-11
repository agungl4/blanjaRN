import React, { useState, useEffect, useRef } from 'react';
import { Container, Header, Body, Left, Content, View, Text, Button } from 'native-base'
import { TextInput, ToastAndroid, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { REACT_APP_BASE_URL } from "@env"
import { useSocket } from '../../utils/context/SocketProvider'
import { Image, TouchableOpacity, StyleSheet } from 'react-native'
let number = 0

const ChatRoom = ({ navigation, route }) => {
    useEffect(() => {
        getNewMessage()
        console.log('did mount')
    }, [])

    const socket = useSocket();

    useEffect(() => {
        socket.on('refresh', (someEvent) => {
            console.log('refresh ke ' + number)
            getNewMessage()
        })
        return () => socket.off('refresh');
    }, [number])

    const auth = useSelector((state) => state.auth)
    const room_id = route.params.room_id
    const splitRoom = room_id.split("S")[1].split("B")
    const [chat, setChat] = useState([])
    const [message, setMessage] = useState('')
    const seller = splitRoom[0]
    const buyer = splitRoom[1]
    const sender = auth.id

    const config = {
        headers: {
            'x-access-token': 'Bearer ' + auth.token,
        },
    };

    const sendMessage = () => {
        const Msg = {
            seller: seller,
            buyer: buyer,
            chatroom: room_id,
            sender: sender,
            message: message
        }
        console.log(Msg)
        axios.post(REACT_APP_BASE_URL + '/chat/addMessage', Msg)
            .then(({ data }) => {
                ToastAndroid.show('Message Sent', ToastAndroid.SHORT, ToastAndroid.CENTER);
                setMessage('')
                console.log('sent')
                number = number + 1
            }).catch(({ response }) => {
                console.log(response.data)
            })
    }

    const getNewMessage = () => {
        axios.get(REACT_APP_BASE_URL + '/chat/newMessage/' + room_id)
            .then(({ data }) => {
                setChat(data.data)
            }).catch(({ response }) => {
                console.log(response.data)
            })
    }
    console.log(chat.length)
    return (
        <>
            <Container>
                <Header transparent>
                    <Left>
                        <Button transparent
                            onPress={() => { navigation.goBack() }}
                        >
                            <Image source={require('../../assets/icons/back.png')} />
                        </Button>
                    </Left>
                    <Body>
                        <Text>Chatroom {room_id}</Text>
                    </Body>
                </Header>
                <Content style={{ backgroundColor: '#ebebeb' }}>
                    {
                        chat.map(({ sender_id, sender_name, message, created_at }) => {
                            let chatMsg;
                            if (sender_id == auth.id) {
                                chatMsg =
                                    <>
                                        <View style={styles.popTextSender}>
                                            <Text style={{ fontSize: 14, fontWeight: '700' }}>You : </Text>
                                            <Text style={{ fontSize: 18 }}>{message}</Text>
                                            <Text style={{ fontSize: 12, fontWeight: '100' }}>Sent at {created_at.split(' ')[1].substr(0, 5)}</Text>
                                        </View>
                                    </>
                            } else {
                                chatMsg =
                                    <>
                                        <View style={styles.popText}>
                                            <Text style={{ fontSize: 14, fontWeight: '700' }}>{sender_name} : </Text>
                                            <Text style={{ fontSize: 18 }}>{message}</Text>
                                            <Text style={{ fontSize: 12, fontWeight: '100' }}>Sent at {created_at.split(' ')[1].substr(0, 5)}</Text>
                                        </View>
                                        <Button transparent></Button>
                                    </>
                            }
                            return (
                                <>
                                    <View style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                        {chatMsg}
                                    </View>
                                </>
                            )
                        })
                    }
                </Content>
                <View>
                    <TextInput
                        multiline={true}
                        style={styles.form}
                        placeholder="Message"
                        value={message}
                        onChangeText={(text) => {
                            setMessage(text)
                        }}
                    />

                    <TouchableOpacity style={styles.btn} onPress={sendMessage}>
                        <Text style={{ color: '#fff' }}>Send</Text>
                    </TouchableOpacity>
                </View>
            </Container>
        </>
    )
}

export default ChatRoom

const styles = StyleSheet.create({
    form: {
        backgroundColor: '#fff',
        marginVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        height: 60,
        textAlignVertical: 'top',
        marginHorizontal: 10
    },
    btn: {
        backgroundColor: '#d9534f',
        marginHorizontal: 20,
        marginBottom: 8,
        height: 30,
        justifyContent: 'center',
        borderRadius: 8,
        width: 75,
        alignItems: 'center',
        left: 280
    },
    popText: {
        backgroundColor: '#fff',
        borderColor: '#DB3022',
        borderRadius: 8,
        borderWidth: 1,
        width: 160,
        height: 80,
        // marginVertical: 5,
        marginLeft: 5,
        paddingLeft: 5,
        paddingTop: 5
    },
    popTextSender: {
        backgroundColor: '#fff',
        borderColor: '#DB3022',
        borderRadius: 8,
        borderWidth: 1,
        width: 160,
        height: 80,
        // marginVertical: 5,
        marginRight: 5,
        paddingLeft: 5,
        paddingTop: 5,
        left: 190,
    }
});