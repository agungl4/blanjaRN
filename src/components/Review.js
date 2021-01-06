import React, { Component } from 'react';
import { Button, Container, Card, CardItem, Left, Body, Right } from 'native-base'
import { Image, Dimensions, StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid'
class Review extends Component {
    render() {
        return (
            <>
                <View style={{ marginLeft: 10, marginRight: 10, }}>
                    <Text style={{ fontFamily: 'Metropolis', fontWeight: "700", fontSize: 34, marginTop: 90, marginBottom: 24, }}>
                        Rating&Reviews
                    </Text>

                    <Grid>
                        <Row>
                            <Col size={2}>
                                <Text style={{ fontSize: 48 }}>4.5</Text>
                                <Text style={{ fontSize: 12, color: '#9B9B9B' }}>23 ratings</Text>
                            </Col>
                            <Col size={3} style={{ alignItems: 'flex-end', flexDirection: 'column' }}>
                                <Image source={require('../assets/icons/5stars-removebg-preview.png')} style={{ marginBottom: 3 }} />
                                <Image source={require('../assets/icons/4stars.png')} style={{ marginBottom: 3 }} />
                                <Image source={require('../assets/icons/3stars.png')} style={{ marginBottom: 3 }} />
                                <Image source={require('../assets/icons/2stars.png')} style={{ marginBottom: 3 }} />
                                <Image source={require('../assets/icons/Star.png')} style={{ marginBottom: 3 }} />
                            </Col>
                            <Col size={3}>
                                <Image source={require('../assets/icons/12.png')} style={{ marginTop: 5, marginBottom: 3 }} />
                                <Image source={require('../assets/icons/5.png')} style={{ marginTop: 5, marginBottom: 3 }} />
                                <Image source={require('../assets/icons/4.png')} style={{ marginTop: 5, marginBottom: 3 }} />
                                <Image source={require('../assets/icons/2.png')} style={{ marginTop: 7, marginBottom: 3 }} />
                                <Image source={require('../assets/icons/0.png')} style={{ marginTop: 5, marginBottom: 3 }} />
                            </Col>
                            <Col size={1} style={{ alignItems: 'flex-end', flexDirection: 'column' }}>
                                <Text style={{ fontSize: 10, color: '#9B9B9B', marginTop: 3 }}>12</Text>
                                <Text style={{ fontSize: 10, color: '#9B9B9B', marginTop: 3 }}>5</Text>
                                <Text style={{ fontSize: 10, color: '#9B9B9B', marginTop: 3 }}>4</Text>
                                <Text style={{ fontSize: 10, color: '#9B9B9B', marginTop: 3 }}>2</Text>
                                <Text style={{ fontSize: 10, color: '#9B9B9B', marginTop: 3 }}>0</Text>
                            </Col>
                        </Row>

                        <Row style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>8 Reviews</Text>
                            <Text>with photos</Text>
                        </Row>

                        <Row>
                            <Card style={{ width: '100%' }}>
                                <CardItem>
                                    <Left>
                                        <Body>
                                            <Image source={require('../assets/images/review.png')} style={{
                                                width: 36,
                                                height: 36,
                                                borderWidth: 1,
                                                borderRadius: 36 / 2,
                                            }} />
                                            <Text>Helene Moore</Text>
                                            <Image source={require('../assets/icons/review-rating.png')} />
                                        </Body>
                                    </Left>

                                    <Right>
                                        <Text> June 5, 2019</Text>
                                    </Right>
                                </CardItem>
                                <CardItem cardBody>
                                    <Body>
                                        <Text>
                                            The dress is great! Very classy and comfortable. It fit perfectly! I'm 5'7" and 130 pounds. I am a 34B chest. This dress would be too long for those who are shorter but could be hemmed. I wouldn't recommend it for those big chested as I am smaller chested and it fit me perfectly. The underarms were not too wide and the dress was made well.
                                        </Text>
                                    </Body>
                                </CardItem>
                                <CardItem>
                                    <Right style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                        <Text>helpful </Text>
                                        <Image source={require('../assets/icons/thumbs.png')} />
                                    </Right>
                                </CardItem>
                            </Card>
                        </Row>
                    </Grid>

                </View>

            </>
        );
    }
}

export default Review;