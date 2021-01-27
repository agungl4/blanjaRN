// import React, { Component } from 'react';
// import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Picker, TextInput, Keyboard } from 'react-native'
// import { Container, Header, Content, Form, Item, Input, Button, Label, Textarea, Body, Left, Title, Right } from 'native-base';
// import { IconBack } from '../../assets'
// import { REACT_APP_BASE_URL } from "@env"
// import axios from 'axios'
// import ImagePicker from 'react-native-image-crop-picker';
// import { io } from 'socket.io-client';
// import { connect } from 'react-redux'
// import { useSocket } from '../../utils/context/SocketProvider';
// class Chat extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       chatMessage: "",
//       chatMessages: [],
//       recipient_id: '',
//       user_id: this.props.auth.id,
//     };
//   }

//   submitChatMessage() {
//     this.socket.emit('chat message', { chatMessage: this.state.chatMessage, sender: this.state.user_id }, this.state.recipient_id);
//     this.setState({ chatMessage: '' });
//   }

//   componentDidMount() {
//     this.socket = io("http://10.0.0.16:8000");
//     this.socket.on("chat message", msg => {
//       this.setState({
//         chatMessages: [...this.state.chatMessages, msg],
//         recipient_id: msg.sender
//       });
//     });
//   }
//   render() {
//     const chatMessages = this.state.chatMessages.map(chatMessage => (
//       <>
//         <Text style={{ top: 300 }}>{chatMessage.sender}</Text>
//         <Text style={{ top: 300 }}>{chatMessage.chatMessage}</Text>
//       </>
//     ));
//     return (
//       <View style={styles.container}>
//         {chatMessages}
//         <TextInput
//           style={{ height: 40, borderWidth: 2, top: 500 }}
//           autoCorrect={false}
//           value={this.state.chatMessage}
//           onSubmitEditing={() => this.submitChatMessage()}
//           onChangeText={chatMessage => {
//             this.setState({ chatMessage });
//           }}
//         />

//       </View>
//     );
//   }
// }

// const mapStateToProps = ({ auth }) => {
//   return {
//     auth
//   };
// };

// export default connect(mapStateToProps)(Chat)

// const styles = StyleSheet.create({
//   container: {
//     height: 400,
//     flex: 1,
//     backgroundColor: '#F5FCFF',
//   },
// });

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { REACT_APP_BASE_URL } from '@env';

//context
import { useSocket } from '../../utils/context/SocketProvider';
//redux
import { useSelector } from 'react-redux';

const Chat = ({route}) => {
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
      if (user_id != msg.sender){
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
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-end',
      }}>
      <View style={{ backgroundColor: 'lightgrey' }}>
        {chatMessages.length !== 0 &&
          chatMessages.map(({ chatMessage, sender }, index) => {
            return (
              <View key={index}>
                <Text>{chatMessage}</Text>
                <Text>{sender}</Text>
              </View>
            );
          })}
      </View>

      <View style={{ height: 300 }} />
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
      <View style={{ height: 75 }} />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  form: {
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 4,
    height: 80,
    textAlignVertical: 'top',
  },
  btn: {
    backgroundColor: '#ebebeb',
    marginHorizontal: 20,
    height: 30,
    justifyContent: 'center',
    borderRadius: 8,
    width: 75,
    alignItems: 'center',
  },
});