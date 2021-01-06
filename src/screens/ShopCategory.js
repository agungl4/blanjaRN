import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import BottomNavigator from '../components/BottomNav'
import CardCategory from '../components/CardCategory'
import { Container, Header, Title, Content, Button, Left, Body, Right, Card, CardItem, ListView } from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid'

class ShopCategory extends Component {
    render() {
        return (
            <>
                <Header transparent>
                    <Left>
                        <Button transparent onPress={() => { this.props.navigation.goBack() }}>
                            <Image source={require('../assets/icons/back.png')} />
                        </Button>
                    </Left>
                    <Body >
                        <Title style={{ color: 'black', marginLeft: 35, fontWeight: 'bold' }}>T-Shirt</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Image source={require('../assets/icons/Search.png')} />
                        </Button>
                    </Right>
                </Header>
                <Container>
                    <View style={styles.filter}>
                        <Grid>
                            <Col>
                                <TouchableOpacity onPress={() => { this.props.navigation.navigate('Filter') }}>
                                    <Text style={styles.txtFilter}> Filter </Text>
                                </TouchableOpacity>
                            </Col>
                            <Col>
                                <TouchableOpacity>
                                    <Text style={styles.txtFilter}> Sort </Text>
                                </TouchableOpacity>
                            </Col>
                        </Grid>
                    </View>




                    <ScrollView>
                        <View style={styles.grid} >
                            <CardCategory navigation={this.props.navigation} />
                            <CardCategory navigation={this.props.navigation} />
                            <CardCategory navigation={this.props.navigation} />
                            <CardCategory navigation={this.props.navigation} />
                            <CardCategory navigation={this.props.navigation} />
                            <CardCategory navigation={this.props.navigation} />
                        </View>
                    </ScrollView>
                </Container>

                <BottomNavigator shop={true} navigation={this.props.navigation} />
            </>
        );
    }
}

export default ShopCategory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingHorizontal: 10
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        marginLeft: 10
    },
    filter: { 
        marginLeft: 10,
        marginBottom:10,flexDirection:'row',
        justifyContent:'center'
    },
    txtFilter: {
        fontSize: 20
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DB3022",
        padding: 10,
        borderRadius: 8,
        marginBottom: 10
    },
    ctgTitle: {
        fontFamily: 'Metropolis-Bold',
        fontSize: 34,
        fontWeight: '700',
        marginTop: 5,

    },
    btnTitle: {
        color: '#fff',
        fontSize: 35,
    },
    btnSub: {
        color: '#fff',
        fontSize: 18,
    },
    card: {
        marginVertical: 10
    },
    cardTitle: {
        flex: 1,
        textAlign: 'center',
    }
});