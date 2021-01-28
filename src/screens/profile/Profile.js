import React, { Component } from 'react';
import { Container, Header, Title, Content, Button, Left, Body, Text, Right } from "native-base";
import { Image, View, TouchableOpacity, Alert, StyleSheet, Modal, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { setLoginfalse, removeEmail, removeId, removeName, removeToken } from './../../utils/redux/ActionCreators/auth'
import { REACT_APP_BASE_URL } from "@env"
import axios from 'axios'

class Profile extends React.Component {
    constructor(props) {
        super(props)
    }
    state = {
        modalVisible: false,
        order: [],
        address: [],
    };

    getMyOrder = () => {
        axios.get(REACT_APP_BASE_URL + '/transactions/myTransaction/' + this.props.auth.id)
            .then(({ data }) => {
                this.setState({
                    order: data.data
                })
            }).catch(({ response }) => {
                console.log(response.data)
            })
    }

    getAddress = () => {
        axios.get(REACT_APP_BASE_URL + `/address/${this.props.auth.id}`)
            .then(({ data }) => {
                console.log(data)
                this.setState({
                    address: data.data
                })
            }).catch(({ response }) => {
                console.log(response)
            })
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    popConfirm = () => {
        Alert.alert(
            'Logout?',
            'Anda akan keluar dari sesi saat ini',
            [
                { text: 'NO', style: 'cancel' },
                { text: 'YES', onPress: () => this.Logout() },

            ])
    }

    Logout = () => {
        this.props.dispatch(setLoginfalse())
        this.props.dispatch(removeEmail())
        this.props.dispatch(removeName())
        this.props.dispatch(removeId())
        this.props.dispatch(removeToken())
        this.props.navigation.navigate('Login')
    }

    componentDidMount = () => {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            if (!this.props.auth.isLogin) {
                this.props.navigation.navigate('Login')
            } else {
                this.setState({
                    loading: false
                })
                this.getAddress()
                this.getMyOrder()
            }
        });
    }

    componentWillUnmount() {
        this._unsubscribe()
    }

    render() {
        const { auth } = this.props
        const { modalVisible } = this.state;
        let storePage;
        if (auth.level == 2) {
            storePage = <>
                <TouchableOpacity style={{ borderBottomColor: 'gray', borderBottomWidth: 0.2, marginLeft: 10, marginRight: 40 }}
                    onPress={() => { this.props.navigation.navigate('Store') }}
                >
                    <View style={{ paddingLeft: 10, marginTop: 5 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>My Store</Text>
                        <Text style={{ color: 'gray', marginBottom: 10 }}>Manage your store products here</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ borderBottomColor: 'gray', borderBottomWidth: 0.2, marginLeft: 10, marginRight: 40 }}
                    onPress={() => { this.props.navigation.navigate('OrderedItem') }}
                >
                    <View style={{ paddingLeft: 10, marginTop: 5 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>Orders</Text>
                        <Text style={{ color: 'gray', marginBottom: 10 }}>Manage your Orders</Text>
                    </View>
                </TouchableOpacity>
            </>
        } else {
            storePage = <>
                <TouchableOpacity style={{ borderBottomColor: 'gray', borderBottomWidth: 0.2, marginLeft: 10, marginRight: 40 }}
                    onPress={() => { this.props.navigation.navigate('Orders') }}
                >
                    <View style={{ paddingLeft: 10, marginTop: 5 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>My Orders</Text>
                        <Text style={{ color: 'gray', marginBottom: 10 }}>You have {this.state.order.length} order</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ borderBottomColor: 'gray', borderBottomWidth: 0.2, marginLeft: 10, marginRight: 40 }}
                    onPress={() => { this.props.navigation.navigate('Shipping') }}>
                    <View style={{ paddingLeft: 10, marginTop: 5 }}
                    >
                        <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>Shipping Adress</Text>
                        <Text style={{ color: 'gray', marginBottom: 10 }}>{this.state.address.length} Shipping Adress</Text>
                    </View>
                </TouchableOpacity>
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
                        <Body />
                        <Right>
                            <Button transparent>
                                <Image source={require('./../../assets/icons/Search.png')} />
                            </Button>
                        </Right>
                    </Header>
                    <Content>
                        <Text style={{ fontWeight: 'bold', fontSize: 42, marginLeft: 10, marginRight: 10 }}>My Profile</Text>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Image source={require('./../../assets/images/profile.jpg')} style={{ width: 80, height: 80, borderRadius: 40, marginLeft: 10, marginRight: 10, marginBottom: 50 }} />
                            <View style={{ paddingLeft: 10, marginTop: 5 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 24 }}>{this.props.auth.name}</Text>
                                <Text style={{ color: 'gray' }}>{this.props.auth.email}</Text>
                            </View>
                        </View>

                        {storePage}

                        <TouchableOpacity style={{ borderBottomColor: 'gray', borderBottomWidth: 0.2, marginLeft: 10, marginRight: 40 }}
                            onPress={() => { this.props.navigation.navigate('Chat') }}
                        >

                            <View style={{ paddingLeft: 10, marginTop: 5 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>Chat</Text>
                                <Text style={{ color: 'gray', marginBottom: 10 }}>chat with selller</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ borderBottomColor: 'gray', borderBottomWidth: 0.2, marginLeft: 10, marginRight: 40 }}
                            onPress={() => { this.props.navigation.navigate('Setting') }}
                        >

                            <View style={{ paddingLeft: 10, marginTop: 5 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>Settings</Text>
                                <Text style={{ color: 'gray', marginBottom: 10 }}>Notification, Password</Text>
                            </View>
                        </TouchableOpacity>
                    </Content>
                    <Button full rounded danger style={{ marginHorizontal: 10, marginBottom: 15 }}
                        onPress={this.popConfirm
                            //     () => {
                            //     this.setModalVisible(!modalVisible);
                            // }
                        }
                    >
                        <Text>Logout</Text>
                    </Button>
                </Container>

                {/* <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text> Apakah anda yakin ingin keluar? </Text>
                            <View style={{ flexDirection: 'row', justifyContent:'space-around'}}>
                                <Button bordered danger
                                    style={{ ...styles.openButton, backgroundColor: "#fff" }}
                                    onPress={() => {
                                        this.setModalVisible(!modalVisible);
                                    }}
                                >
                                    <Text style={{color: '"#d9534f"'}}>Cancel</Text>
                                </Button>

                                <Button
                                    style={{ ...styles.openButton, backgroundColor: "#d9534f" }}
                                    onPress={this.Logout}
                                >
                                    <Text >Logout</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                </Modal> */}

            </>
        )
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        auth
    };
};

export default connect(mapStateToProps)(Profile);

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    openButton: {

        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});