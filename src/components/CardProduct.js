import React, { Component } from 'react';
import {
    View,
    Text,
    Image, TouchableOpacity
} from 'react-native';
import { Container, Card, CardItem } from 'native-base';
import { REACT_APP_BASE_URL } from "@env"

class CardProduct extends Component {
    constructor(props) {
        super(props)
    }

    toPrice = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    render() {
        const { id, name, price, category, image,rating, dibeli } = this.props

        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate('DetailPage', {
                        itemId: this.props.id,
                    })
                }}
            >
                <Card style={{ height: 280, marginRight: 10, width: 158 }}>
                    <CardItem cardBody>
                        <View >
                            <Image source={{ uri: REACT_APP_BASE_URL + image, maxWidth: 150, height: 180 }} />
                            {/* <Image source={'https://b74bad6ddfe3.ngrok.io'+ image.split(',')[0]} /> */}
                            <Text style={{ color: 'gray', marginTop: 5 }}> {category} </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 15 }}> {name} </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 15 }}> Rp. {this.toPrice(price)} </Text>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'row', marginRight: 5 }}>
                                    <Image source={require('../assets/icons/Star.png')} style={{ marginTop: 2.5, marginRight: 5 }} />
                                    <Text>{rating}</Text></View>
                                <Text>| Terjual ({dibeli})</Text>
                            </View>
                        </View>
                    </CardItem>
                </Card>
            </TouchableOpacity>
        );
    }
}

export default CardProduct;