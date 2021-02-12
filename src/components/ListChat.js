import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import {useSelector} from 'react-redux'
import axios from 'axios'
import { REACT_APP_BASE_URL } from "@env"

const List = ({ navigation, chatroom }) => {
    const auth = useSelector((state) => state.auth)
    const [name, setName] = useState('loading')
    const getName = () => {
        if (auth.level == 1) {
            axios.get(REACT_APP_BASE_URL + '/user/name/' + chatroom.split("S")[1].split("B")[0])
                .then(({ data }) => {
                    setName(data.data.fullname)
                })
        } else {
            axios.get(REACT_APP_BASE_URL + '/user/name/' + chatroom.split("S")[1].split("B")[1])
                .then(({ data }) => {
                    setName(data.data.fullname)
                })
        }
    }
    useEffect(() => {
        getName()
    }, [chatroom])

    return (
        <>
            <View>
                <TouchableOpacity style={{ borderBottomColor: 'gray', borderBottomWidth: 0.2, marginLeft: 10, marginRight: 40 }}
                    onPress={() => {
                        navigation.navigate('ChatRoom', {
                            room_id: chatroom
                        })
                    }}
                >
                    <View style={{ paddingLeft: 10, marginTop: 5 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>{name}</Text>
                        <Text style={{ color: 'gray', marginBottom: 10 }}>Chatroom {chatroom}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default List 