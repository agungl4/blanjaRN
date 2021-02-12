import React, { useState, useEffect } from 'react';
import { Container, Header, Body, Left, Content, View, Text, Button } from 'native-base'
import { useSelector } from 'react-redux'
import { Image } from 'react-native'
import axios from 'axios'
import { REACT_APP_BASE_URL } from "@env"
import List from '../../components/ListChat'
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
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Image source={require('../../assets/images/profile.jpg')} style={{ width: 80, height: 80, borderRadius: 40, marginLeft: 10, marginRight: 10, marginBottom: 50 }} />
                        <View style={{ paddingLeft: 10, marginTop: 5 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 24 }}>{auth.name}</Text>
                            <Text style={{ color: 'gray' }}>{auth.email}</Text>
                        </View>
                    </View>
                    <Text style={{ fontSize: 24, marginLeft: 20, marginBottom: 10 }}>Chat List</Text>
                    {
                        chatList.map(({ chatroom }) => {
                            return <List chatroom={chatroom} navigation={navigation} />
                        })
                    }
                </Content>
            </Container>
        </>
    )


}

export default ListChat