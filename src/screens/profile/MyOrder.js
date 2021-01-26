import React, { Component } from 'react';
import { Container, Header, Title, Content, Button, Footer, FooterTab, Left, Body, Text, Right, List, ListItem } from "native-base";
import { Image, View, TouchableOpacity, StyleSheet } from 'react-native'
import CardOrder from '../../components/CardOrders'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux'
import { REACT_APP_BASE_URL } from "@env"
import axios from 'axios'

class Orders extends React.Component {
    state = {
        cardOrder: [],
    }
    getMyOrder = () => {
        axios.get(REACT_APP_BASE_URL + '/transactions/myTransaction/' + this.props.auth.id)
            .then(({ data }) => {
                this.setState({
                    cardOrder: data.data
                })
            }).catch(({ response }) => {
                console.log(response.data)
            })
    }

    componentDidMount = () => {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getMyOrder()
        });
    }

    componentWillUnmount() {
        this._unsubscribe()
    }
    render() {
        const { cardOrder } = this.state
        let orderedItem
        if (cardOrder.length > 0) {
            orderedItem = <>
                {
                    cardOrder.length > 0 && cardOrder.map(({ trxId, trackingNumber, qty, total, created_at, status }) => {
                        return (
                            <>
                                <CardOrder trxId={trxId} trackingNumber={trackingNumber} qty={qty} total={total} created_at={created_at} status={status} navigation={this.props.navigation} />
                            </>
                        )
                    })
                }
            </>
        } else {
            orderedItem = <>
            <Text> Belum ada transaksi </Text>
            </>
        }
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
                        <Right>
                            <Button transparent>
                                <Image source={require('../../assets/icons/Search.png')} />
                            </Button>
                        </Right>
                    </Header>
                    <Content style={{ backgroundColor: '#f0f0f0' }}>
                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 42, marginLeft: 15, marginRight: 10, marginTop: 10 }}>My Orders</Text>
                        </View>
                        <SafeAreaView>
                            <ScrollView style={{ height: 480 }}>
                                {
                                    orderedItem
                                }
                            </ScrollView>
                        </SafeAreaView>
                    </Content>

                </Container>
            </>
        )
    }
}

const mapStateToProps = ({ auth, address }) => {
    return {
        auth,
        address
    };
};

export default connect(mapStateToProps)(Orders)

