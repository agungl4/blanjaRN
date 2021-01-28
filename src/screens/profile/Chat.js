import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { REACT_APP_BASE_URL } from '@env';
import { Container, Header, Body, Left, Right, Content, Button, Text, View } from 'native-base'
//context
import { useSocket } from '../../utils/context/SocketProvider';
//redux
import { useSelector } from 'react-redux';

const Chat = ({ route,navigation }) => {
  const [sellerId, setSellerId] = useState(0)
  const socket = useSocket();
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const user_id = useSelector((state) => state.auth.id);
  // const recipient = user_id == 3 ? 18 : 3

  useEffect(() => {
    if (route.params && route.params.sellerId) {
      setSellerId(route.params.sellerId)
    }
  }, [])

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setChatMessages((chatMessages) => [...chatMessages, msg]);
      if (user_id != msg.sender) {
        setSellerId(msg.sender)
      }
    });
    return () => {
      socket.off('chat message');
    };
  }, []);

  const submitChatMessage = () => {
    socket.emit('chat message', { chatMessage, sender: user_id }, sellerId);
    setChatMessage('');
  };

  console.log(chatMessages);
  console.log('length ' + chatMessages.length);
  return (
    <Container>
      <Header transparent>
        <Left>
          <Button transparent
            onPress={() => { navigation.goBack() }}
          >
            <Image source={require('../../assets/icons/back.png')} />
          </Button>
        </Left>
        <Body><Text>{sellerId}</Text></Body>
        <Right />
      </Header>
      <Content style={{backgroundColor:'#ebebeb'}}>
        <View >
          {chatMessages.length !== 0 &&
            chatMessages.map(({ chatMessage, sender }, index) => {
              let balloonText
              if (user_id != sender) {
                balloonText = <View style={styles.popText} key={index}>
                  <Text>User {sender}</Text>
                  <Text>{chatMessage}</Text>
                </View>
              } else {
                balloonText = <View style={styles.popTextSender} key={index}>
                  <Text>You {sender}</Text>
                  <Text>{chatMessage}</Text>
                </View>
              }
              return (
                <>{balloonText}</>
              );
            })}
        </View>
      </Content>
      <View>
        <TextInput
          multiline={true}
          style={styles.form}
          placeholder="Message"
          value={chatMessage}
          onSubmitEditing={() => submitChatMessage()}
          onChangeText={(chatMessage) => {
            setChatMessage(chatMessage);
          }}
        />
        <TouchableOpacity style={styles.btn} onPress={submitChatMessage}>
          <Text style={{ color: '#fff' }}>Send</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 15 }} />
    </Container>
  );
};

export default Chat;

const styles = StyleSheet.create({
  form: {
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    height: 60,
    textAlignVertical: 'top',
    marginHorizontal:10
  },
  btn: {
    backgroundColor: '#d9534f',
    marginHorizontal: 20,
    height: 30,
    justifyContent: 'center',
    borderRadius: 8,
    width: 75,
    alignItems: 'center',
  },
  popText: {
    backgroundColor: '#fff',
    borderColor: '#DB3022',
    borderRadius: 8,
    borderWidth: 1,
    width: 160,
    height: 80,
    marginVertical: 10,
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
    marginVertical: 10,
    marginRight: 5,
    paddingLeft: 5,
    paddingTop: 5,
    left: 190,
  }
});