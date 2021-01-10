import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CardBag from '../components/CardBag';
import BottomNavigator from '../components/BottomNav'
import { Container, Header, Title, Content, Button, Left, Body, Right } from "native-base";
// import {
//   COLOR_DISABLE,
//   COLOR_MAIN,
//   FONT_BOLD,
//   FONT_LIGHT,
// } from '../../utils/constans';

// import React, { Component } from 'react';

class Mybag extends Component {
  constructor(props) {
    super(props)
  }
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
          {/* <Body >
            <Title style={{ color: 'black', marginLeft: 35, fontWeight: 'bold' }}>CheckOut</Title>
          </Body> */}
          <Right>
            <Button transparent>
              <Image source={require('../assets/icons/Search.png')} />
            </Button>
          </Right>
        </Header>
        <Container>
          <View style={styles.container}>
            <Text
              style={{
                fontFamily: 'Metropolis-Bold',
                fontSize: 34,
                fontWeight: '700',
                marginTop: 10,
                marginBottom: 10,
              }}>
              My Bag
        </Text>
            <CardBag />
            <CardBag />
            <CardBag />
          </View>
          <View style={styles.addcart}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: '#fff',
                marginHorizontal: 10,
                marginVertical: 10,
              }}>
              <Text style={{ fontFamily: 'Metropolis-Light', color: '#9B9B9B' }}>
                Total amount:
            </Text>
              <Text style={{ fontFamily: 'Metropolis-Bold' }}>112$</Text>
            </View>
            <TouchableOpacity>
              <View style={styles.btn}>
                <Text style={{ color: '#fff' }}>CHECK OUT</Text>
              </View>
            </TouchableOpacity>
            {/* <BottomNavigator mybag={true} navigation={this.props.navigation} /> */}
          </View>
        </Container>
      </>
    );
  }
}

export default Mybag;

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: windowWidth * 0.04,
  },
  addcart: {
    position: 'absolute',
    bottom: 0,
    top: undefined,
    backgroundColor: '#fff',
  },
  btn: {
    backgroundColor: '#DB3022',
    width: windowWidth,
    height: 48,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 24,
  },
});