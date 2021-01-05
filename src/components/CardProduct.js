import React, { Component } from 'react';
import {
    View,
    Text,
    Image, TouchableOpacity
} from 'react-native';
import { Container, Card, CardItem } from 'native-base';

class CardProduct extends Component {
    constructor(props) {
        super(props)
      }
    render() {

        return (
            <TouchableOpacity
            onPress={() => {this.props.navigation.navigate('DetailPage')}}
            >
            <Card style={{ height: 270, marginRight: 10 }}>
                <CardItem cardBody>
                    <View >
                        <Image source={require('./../assets/images/image.png')} />
                        <Image source={require('./../assets/icons/rating.png')} style={{ marginTop: 5 }} />
                        <Text style={{ color: 'gray', marginTop: 5 }}> OVS </Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 15 }}> Product Name </Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 15 }}> 30$ </Text>
                    </View>
                </CardItem>
            </Card>
            </TouchableOpacity>
        );
    }
}

export default CardProduct;