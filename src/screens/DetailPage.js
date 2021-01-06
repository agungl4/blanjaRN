import React, { Component } from 'react'
import { Image, Dimensions, StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Picker } from 'react-native';
import CardProduct from '../components/CardProduct'
import Review from '../components/Review'
import { Left, Body, Right, Title, Button, Container, Header } from 'native-base'
import { Row, Grid } from 'react-native-easy-grid'
import axios from 'axios'

const getUrl = "https://186c58de6dfb.ngrok.io/product/"

// const url = getUrl + this.props.route.params.itemId
// console.log(url)

class DetailPage extends Component {
    constructor(props){
        super(props)
    }
    state = {
        sizeSelected: 0,
        colorSelected: 0,
        product: [],
    };

    getSingleProduct = () => {
        axios
            .get(getUrl+this.props.route.params.itemId)
            .then(({ data }) => {
                console.log(data.data)
                this.setState({
                    product: data.data,
                })
            })
            .catch((err) => {
                console.log(err)
            });
    }

    // getRecommendation = () => {
    //     axios.get(getUrl + `/search?category=` + this.props.category_id)
    //         .then(({ data }) => {
    //             console.log(data.data.products)
    //             this.setState({
    //                 recommend: data.data.products
    //             })
    //         }).catch((error) => {
    //             console.log(error)
    //         })
    // }

    componentDidMount = () => {
        this.getSingleProduct();
    }

    render() {
        // const { itemId } = this.props.route.params;
        console.log('a'+this.props)
        const { product } = this.state
        console.log('b'+this.state)
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
                    product && product.map(({ product_id, product_name, product_price, product_desc, category_name, product_img }) => {
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
                                                                        <Image source={{ uri: 'https://186c58de6dfb.ngrok.io' + img }} style={styles.image} />
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
                                                                    selectedValue={this.state.sizeSelected}
                                                                    onValueChange={(itemValue, itemIndex) => this.setSelectedValue(itemValue)}
                                                                >
                                                                    <Picker.Item label="Size" value="0" />
                                                                    <Picker.Item label="S" value="1" />
                                                                    <Picker.Item label="M" value="2" />
                                                                    <Picker.Item label="L" value="3" />
                                                                </Picker>
                                                            </View>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity>
                                                            <View style={styles.size}>
                                                                <Picker
                                                                    selectedValue={this.state.colorSelected}
                                                                    onValueChange={(itemValue, itemIndex) => this.setSelectedValue(itemValue)}
                                                                >
                                                                    <Picker.Item label="Color" value="0" />
                                                                    <Picker.Item label="Red" value="1" />
                                                                    <Picker.Item label="Green" value="2" />
                                                                    <Picker.Item label="Blue" value="3" />
                                                                    <Picker.Item label="Black" value="4" />
                                                                </Picker>
                                                            </View>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity>
                                                            <View style={styles.love}>
                                                                <Image source={require('./../assets/icons/fav.png')} />
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={styles.wraptitle}>
                                                        <Text style={styles.title}>{product_name}</Text>
                                                        <Text style={styles.title}>{product_price}</Text>
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
                                                            3 items
                                                        </Text>
                                                    </View>
                                                    <SafeAreaView>
                                                        <ScrollView horizontal={true}>
                                                            <View style={styles.card}>
                                                                <CardProduct navigation={this.props.navigation} />
                                                                <CardProduct navigation={this.props.navigation} />
                                                                <CardProduct navigation={this.props.navigation} />
                                                            </View>
                                                        </ScrollView>
                                                    </SafeAreaView>
                                                    <Review />
                                                </View>
                                            </Row>
                                        </ScrollView>
                                    </SafeAreaView>
                                </Grid>

                                <TouchableOpacity
                                    onPress={() => { this.props.navigation.navigate('MyBag') }}
                                >
                                    <Button danger full rounded style={{ marginTop: 15 }}>

                                        <Text style={{ color: '#fff' }}> Add to Cart </Text>
                                    </Button>
                                </TouchableOpacity>
                            </Container>
                        )
                    })
                }
            </>
        );
    }
}

export default DetailPage;

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
        fontSize: 24,
    },
    wraptitle: {
        flexDirection: 'row',
        marginTop: 22,
        justifyContent: 'space-between',
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
    },
    size: {
        width: 160,
        height: 40,
        // paddingVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#9B9B9B',
        paddingHorizontal: 5,
    },
});