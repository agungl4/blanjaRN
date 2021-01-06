import React, { Component } from 'react'
import { Image, Dimensions, StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { IconFavorite } from '../assets/index'
import IconStar from '../assets/icons/rating.png'
import CardProduct from '../components/CardProduct'
import Review from '../components/Review'
import { Left, Body, Right, Title, Button, Container, Header } from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid'
import { Picker } from '@react-native-picker/picker';

class DetailPage extends Component {
    state = {
        sizeSelected: 0,
        colorSelected: 0,
    };
    render() {
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

                <Container>
                    <Grid>
                        <SafeAreaView>
                            <ScrollView>
                                <Row size={50}>
                                    <View style={styles.imgwrap}>
                                        <SafeAreaView>
                                            <ScrollView horizontal={true}>
                                                <Image source={require('./../assets/images/image.png')} style={styles.image} />
                                                <Image source={require('./../assets/images/image2.png')} style={styles.image} />
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
                                                        <Picker.Item label="Select Size" value="0" />
                                                        <Picker.Item label="S" value="1" />
                                                        <Picker.Item label="M" value="2" />
                                                        <Picker.Item label="L" value="3" />
                                                    </Picker>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <View style={styles.size}>
                                                    <Text>Color</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <View style={styles.love}>
                                                    <Image source={require('./../assets/icons/fav.png')} />
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.wraptitle}>
                                            <Text style={styles.title}>HM</Text>
                                            <Text style={styles.title}>$19.99</Text>
                                        </View>
                                        <Text style={styles.PrdName}>Short black dress</Text>
                                        <View>
                                            <Image source={require('./../assets/icons/rating.png')} />
                                            <Text style={styles.PrdName}> (10)</Text>
                                        </View>
                                        <Text style={styles.desc}>
                                            Short dress in soft cotton jersey with decorative buttons down the
                                            front and a wide, frill-trimmed square neckline with concealed
                                            elastication. Elasticated seam under the bust and short puff sleeves
                                            with a small frill trim.
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

                    <Button danger full rounded style={{ marginTop: 15 }}>
                        <TouchableOpacity
                            onPress={() => { this.props.navigation.navigate('MyBag') }}
                        >
                            <Text style={{ color: '#fff' }}> Add to Cart </Text>
                        </TouchableOpacity>
                    </Button>
                </Container>
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
        width: 275,
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
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#9B9B9B',
        paddingHorizontal: 5,
    },
});