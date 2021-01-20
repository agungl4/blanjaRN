import React, { Component } from 'react';
import { Container, Header, Title, Content, Button, Left, Body, Text, Item, Input, Label } from "native-base";
import { Image, View, TouchableOpacity, StyleSheet } from 'react-native'
import CardOrder from '../../components/CardOrderDetail'
import { connect } from 'react-redux'
import { REACT_APP_BASE_URL } from "@env"
import axios from 'axios'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

export default class DetailOrders extends React.Component {
    state = {
        orderDetails: []
    }

    componentDidMount = () => {
        console.log(REACT_APP_BASE_URL + '/transactions/getOrderDetail/' + this.props.route.params.trxId)
        axios.get(REACT_APP_BASE_URL + '/transactions/getOrderDetail/' + this.props.route.params.trxId)
            .then(({ data }) => {
                this.setState({
                    orderDetails: data.data
                })
            }).catch(({ response }) => {
                console.log(response.data)
            })
    }
    render() {
        const { TrxId, created_at, trackingNumber, status, qty, address, city, postal, payment, total, cardOrder } = this.state.orderDetails
        const newDate = `${created_at}`
        return (
            <>
                <Container>
                    <Header transparent>
                        <Left>
                            <Button transparent
                                onPress={() => { this.props.navigation.goBack() }}
                            >
                                <Image source={require('./../../assets/icons/back.png')} />
                            </Button>
                        </Left>
                        <Body >
                            <Title style={{ color: 'black', fontWeight: 'bold', marginLeft: 20 }}>Order Details</Title>
                        </Body>
                    </Header>

                    <Content style={{ backgroundColor: '#f0f0f0', margin: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                                Order No :
                                        <Text style={{ color: 'gray', }}> {TrxId}</Text>
                            </Text>
                            <Text style={{ marginLeft: 60, color: 'green' }}>{newDate.substr(0, 10)}</Text>
                        </View>
                        <Text style={{ marginTop: 10, color: 'gray', fontSize: 18 }}>
                            Tracking Number :
                                        <Text style={{ fontWeight: 'bold', color: 'black' }}> {trackingNumber}</Text>
                        </Text>
                        <Text style={{ color: 'green', fontWeight: 'bold' }}>{status}</Text>
                        <Text style={{ fontWeight: 'bold', marginBottom: 15, marginTop: 10 }}>{qty} Items</Text>
                        {
                            cardOrder && cardOrder.map(({ product_name, price, product_img, color, size, qty }) => {
                                return (
                                    <>
                                        <CardOrder name={product_name} price={price} img={product_img} color={color} size={size} qty={qty} />
                                    </>
                                )
                            })
                        }
                        <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Order Information</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: 'gray', width: 125, marginBottom: 10 }}>Shipping Address  </Text>
                            <Text style={{ width: 215, fontWeight: 'bold' }}>{address}, {city}, ID {postal}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', height: 30, marginBottom: 10 }}>
                            <Text style={{ width: 125, color: 'gray' }}>Payment Method </Text>
                            {/* <Image source={require('./../../assets/images/card.png')} style={{ height: 30, width: 80 }} /> */}
                            <Text>{payment}</Text>
                            <Text style={{ width: 135 }}>**** **** **** 3947</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Text style={{ color: 'gray', width: 125 }}>Delivery Method  </Text>
                            <Text style={{ width: 215, fontWeight: 'bold' }}>Fedex, 3 Days, 15$</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Text style={{ color: 'gray', width: 125 }}>Discount  </Text>
                            <Text style={{ width: 215, fontWeight: 'bold' }}>10% Discount Code, PALUGADA</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Text style={{ color: 'gray', width: 125 }}>Total Amount  </Text>
                            <Text style={{ width: 215, fontWeight: 'bold' }}>Rp. {total}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                            <Button full rounded bordered dark style={styles.btn}
                                onPress={() => { this.props.navigation.navigate('Home') }}
                            >
                                <Text>Reorder</Text>
                            </Button>
                            <Button full rounded danger style={styles.btn} onPress={() => {
                                this.props.navigation.navigate('Review', {
                                    trxId: TrxId
                                })
                            }}>
                                <Text>Leave Feedback</Text>
                            </Button>
                        </View>
                    </Content>

                </Container>
            </>
        )
    }
}

const styles = StyleSheet.create({
    btn: {
        width: 150
    }
})