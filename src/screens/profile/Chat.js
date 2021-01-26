import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Picker } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Button, Label, Textarea, Body, Left, Title, Right } from 'native-base';
import { IconBack } from '../../assets'
import { REACT_APP_BASE_URL } from "@env"
import axios from 'axios'
import ImagePicker from 'react-native-image-crop-picker';

class Chat extends Component {
    render() {
        return (
            <Content>
                <Item rounded>
                    <Input placeholder='Search' value={searchForm} onChangeText={(text) => { this.setState({ searchForm: text }) }} />
                    <Button  onPress={this.submit}>
                        <Text>Send</Text>
                    </Button>
                </Item>
            </Content>
        );
    }
}

export default Chat;