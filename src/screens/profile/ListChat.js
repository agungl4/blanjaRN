import React, { useState, useEffect } from 'react';
import { Container, Header, Body, Left, Content, View, Text, Button } from 'native-base'
import { useSelector } from 'react-redux'
import { Image } from 'react-native'
import axios from 'axios'
import { REACT_APP_BASE_URL } from "@env"

const ListChat = ({ navigation }) => {
    const auth = useSelector((state) => state.auth)
    const [chatList, setChatList] = useState([])

    const config = {
        headers: {
            'x-access-token': 'Bearer ' + auth.token,
        },
    };

    const ChatRoom = () => {
        if (auth.level == 2) {
            axios.get(REACT_APP_BASE_URL + `/chat/chatRoomSeller`, config)
                .then(({ data }) => {
                    console.log(data)
                    setChatList(data.data)
                }).catch(({ response }) => {
                    console.log(response.data)
                })
        } else {
            axios.get(REACT_APP_BASE_URL + `/chat/chatRoomBuyer`, config)
                .then(({ data }) => {
                    console.log(data)
                    setChatList(data.data)
                }).catch(({ response }) => {
                    console.log(response.data)
                })
        }
    }
    useEffect(() => {
        ChatRoom()
    }, [])
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
                        <Text>List Chatroom</Text>
                    </Body>
                </Header>
                <Content>
                    {
                        chatList.map(({ chatroom }) => {
                            return (
                                <>
                                    <View>
                                        <Button full rounded danger
                                            onPress={() => {
                                                navigation.navigate('ChatRoom', {
                                                    room_id: chatroom
                                                })
                                            }}
                                            style={{marginVertical:10, marginHorizontal:10}}
                                        >
                                            <Text>{chatroom}</Text>
                                        </Button>
                                    </View>
                                </>
                            )
                        })
                    }
                </Content>
            </Container>
        </>
    )


}

export default ListChat