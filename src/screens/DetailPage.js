import React, { Component } from 'react'
import { Image, Dimensions, StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Picker, ToastAndroid, Alert } from 'react-native';
import Review from '../components/Review'
import { Left, Body, Right, Title, Button, Container, Header } from 'native-base'
import { Row, Grid } from 'react-native-easy-grid'
import axios from 'axios'
import { REACT_APP_BASE_URL } from "@env"
import { addItems } from '../utils/redux/ActionCreators/cart'
import { connect } from 'react-redux'
import CardProduct from '../components/CardForYou'

class DetailPage extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        selectedSize: 0,
        selectedColor: 0,
        product: [],
        foryou: [],
    };

    setSize = (e) => {
        this.setState({
            selectedSize: e
        })
    }

    setColor = (e) => {
        this.setState({
            selectedColor: e
        })
    }

    getSingleProduct = () => {
        axios
            .get(REACT_APP_BASE_URL + '/product/' + this.props.route.params.itemId)
            .then(({ data }) => {
                // console.log(data.data)
                this.setState({
                    product: data.data,
                })
            })
            .catch((err) => {
                console.log(err.response.data)
            });
    }

    toPrice = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    getForYou = () => {
        axios.get(REACT_APP_BASE_URL + '/products?sortBy=rating&orderBy=desc')
            .then(({ data }) => {
                // console.log(data)
                this.setState({
                    foryou: data.data.products,
                })
            }).catch((error) => {
                // console.log(error.response)
            })
    }

    componentDidMount = () => {
        this.getSingleProduct();
        this.getForYou()
    }

    addToCart = () => {
        if (!this.props.auth.isLogin) {
            alert('Anda harus login terlebih dahulu')
        } else {
            if (this.state.selectedColor == 0 || this.state.selectedSize == 0) {
                Alert.alert(
                    'Kesalahan',
                    'Harap memilih warna dan ukuran',
                    [
                        { text: 'OK', style: 'cancel' },

                    ])
            } else {
                const Items = {
                    user_id: this.props.auth.id,
                    product_id: this.props.route.params.itemId,
                    product_name: this.state.product[0].product_name,
                    product_img: this.state.product[0].product_img.split(',')[0],
                    color: this.state.selectedColor,
                    size: this.state.selectedSize,
                    price: this.state.product[0].product_price,
                    qty: 1
                }
                console.log(Items)
                this.props.dispatch(addItems(Items))
                ToastAndroid.show("Berhasil menambah item ke keranjang.", ToastAndroid.SHORT);
                // this.props.navigation.navigate('MyBag')
            }
        }
    }
    toPrice = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    render() {
        const { product, foryou } = this.state
        const id_productDetails = this.props.route.params.itemId
        let btnAddCart;
        let btnChat;
        if (this.props.auth.level == 1) {
            btnAddCart =
                <Button danger full rounded style={{ marginTop: 15 }} onPress={this.addToCart}>
                    <Text style={{ color: '#fff' }}> Add to Cart </Text>
                </Button>
            btnChat =
                <TouchableOpacity onPress={() => {
                    // this.props.navigation.navigate('Chat', {
                    //     sellerId: fullname
                    this.props.navigation.navigate('ChatRoom', {
                        room_id: `S${product[0].sellerId}B${this.props.auth.id}`
                    })
                }}>
                    <View style={styles.love}>
                        <Image source={require('./../assets/icons/messenger.png')} />
                    </View>
                </TouchableOpacity>
        } 
        return (
            <>
                <Header transparent>
                    <Left>
                        <Button transparent
                            onPress={() => { this.props.navigation.goBack() }}
                        >
                            <Image source={require('../assets/icons/back.png')} />
                        </Button>
                    </Left>
                    <Body >
                        <Title style={{ color: 'black', marginLeft: 35, fontWeight: 'bold' }}>Detail Product</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Image source={require('../assets/icons/Search.png')} />
                        </Button>
                    </Right>
                </Header>

                {
                    product && product.map(({ id, sellerId, fullname, product_name, product_price, product_desc, size_name, color_name, category_name, product_img, rating }) => {
                        return (
                            <Container>
                                <Grid>
                                    <SafeAreaView>
                                        <ScrollView>
                                            <Row size={50}>
                                                <View style={styles.imgwrap}>
                                                    <SafeAreaView>
                                                        <ScrollView horizontal={true}>
                                                            {
                                                                product_img && product_img.split(',').map((img) => {
                                                                    return (
                                                                        <Image source={{ uri: REACT_APP_BASE_URL + img }} style={styles.image} />
                                                                    )
                                                                })
                                                            }

                                                        </ScrollView>
                                                    </SafeAreaView>
                                                </View>
                                            </Row>

                                            <Row size={50}>
                                                <View style={styles.container}>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <TouchableOpacity>
                                                            <View style={styles.size}>
                                                                <Picker
                                                                    selectedValue={this.state.selectedSize}
                                                                    onValueChange={(itemValue, itemIndex) => this.setSize(itemValue)}
                                                                >
                                                                    <Picker.Item label="Size" value="0" style={{ backgroundColor: 'gray' }} />
                                                                    <Picker.Item label={size_name} value={size_name} />
                                                                </Picker>
                                                            </View>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity>
                                                            <View style={styles.size}>
                                                                <Picker
                                                                    selectedValue={this.state.selectedColor}
                                                                    onValueChange={(itemValue, itemIndex) => this.setColor(itemValue)}
                                                                >
                                                                    <Picker.Item label="Color" value="0" />
                                                                    <Picker.Item label={color_name} value={color_name} />
                                                                </Picker>
                                                            </View>
                                                        </TouchableOpacity>

                                                        {btnChat}

                                                    </View>
                                                    <View style={styles.wraptitle}>
                                                        <Text style={styles.title}>{product_name}</Text>
                                                        <Text style={styles.subtitle}>Rp. {this.toPrice(product_price)}</Text>
                                                    </View>
                                                    <Text style={styles.PrdName}>{category_name}</Text>
                                                    <View>
                                                        <Image source={require('./../assets/icons/rating.png')} />
                                                        <Text style={styles.PrdName}> (10)</Text>
                                                    </View>
                                                    <Text style={styles.desc}>
                                                        {product_desc}
                                                    </Text>

                                                    {/* <ListBar nav={navigation} /> */}
                                                    <View style={styles.text}>
                                                        <Text style={{ fontFamily: 'Metropolis', fontSize: 18 }}>
                                                            You can also like this
                                                        </Text>
                                                        <Text
                                                            style={{
                                                                fontFamily: 'Metropolis-Light',
                                                                fontSize: 11,
                                                                color: '#9B9B9B',
                                                            }}>
                                                            {foryou.length} items
                                                        </Text>
                                                    </View>
                                                    <SafeAreaView>
                                                        <ScrollView horizontal={true}>
                                                            <View style={{ flexDirection: 'row' }}>
                                                                {
                                                                    foryou && foryou.map(({ id, product_name, product_price, product_img, category_name, color_name, size_name, rating, dibeli }) => {
                                                                        let img = product_img.split(',')[0]
                                                                        return (
                                                                            <>
                                                                                <CardProduct navigation={this.props.navigation} key={id} product_name={product_name} product_price={product_price} product_img={img} keyId={id} category={category_name} color={color_name} size={size_name} rating={rating} dibeli={dibeli} />
                                                                            </>
                                                                        )
                                                                    })
                                                                }
                                                            </View>
                                                        </ScrollView>
                                                    </SafeAreaView>
                                                    <Review idProduct={id_productDetails} rating={rating} />
                                                </View>
                                            </Row>
                                        </ScrollView>
                                    </SafeAreaView>
                                </Grid>

                                {btnAddCart}

                            </Container>
                        )
                    })
                }
            </>
        );
    }
}

const mapStateToProps = ({ auth, bag }) => {
    return {
        auth,
        bag
    };
};

export default connect(mapStateToProps)(DetailPage);

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        marginLeft: windowWidth * 0.02,
        marginRight: windowWidth * 0.02,
        marginTop: windowWidth * 0.04,
    },
    imgwrap: {
        flexDirection: 'row',
    },
    image: {
        width: 350,
        height: 413,
    },
    addcart: {
        position: 'absolute',
        bottom: 0,
        top: undefined,
    },
    btn: {
        backgroundColor: '#DB3022',
        width: "100%",
        height: 48,
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 24,
    },
    title: {
        fontFamily: 'Metropolis-Light',
        fontSize: 20,
        width: 230,
        fontWeight: '700'
    },
    subtitle: {
        fontFamily: 'Metropolis-Light',
        fontSize: 20,
        fontWeight: '700'
    },
    wraptitle: {
        flexDirection: 'row',
        marginTop: 22,
        justifyContent: 'space-around',
    },
    PrdName: {
        fontFamily: 'Metropolis-Light',
        fontSize: 11,
        color: '#9B9B9B',
    },
    rating: {
        flexDirection: 'row',
        marginVertical: 5,
    },
    desc: {
        fontFamily: 'Metropolis',
    },
    text: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
        marginBottom: 12,
    },
    card: {
        flexDirection: 'row',
    },
    sizecontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    love: {
        height: 36,
        width: 36,
        alignItems: 'center',
        paddingVertical: 13,
        borderRadius: 18,
        bottom: 10
    },
    size: {
        width: 160,
        height: 40,
        // paddingVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#9B9B9B',
        right: 3
    },
});