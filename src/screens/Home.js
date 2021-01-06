import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  Dimensions,
  Image,
  ImageBackground, SafeAreaView, ScrollView, StyleSheet
} from 'react-native';
import { Container } from 'native-base';
import { Row, Grid } from 'react-native-easy-grid';
import CardProduct from '../components/CardProduct'
import BottomNavigator from '../components/BottomNav'

class Home extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Container>
        <View style={{ height: 180 }}>
          <ImageBackground style={{ width: '100%', height: '100%' }} source={require('../assets/images/header.png')}>
            <View style={{ position: 'absolute', left: 0, bottom: 0, marginBottom: 15, marginLeft: 10 }}>
              <Text style={{ fontSize: 35, fontWeight: 'bold', color: '#fff' }}> Street Clothes</Text>
            </View>
          </ImageBackground>
        </View>

        <Grid>
          <SafeAreaView>
            <ScrollView vertical={true}>
              <View>
                <Text style={styles.title}>New</Text>
                <Text style={styles.view}>View all</Text>
                <Text style={styles.text}>You’ve never seen it before!</Text>
              </View>
              <Row size={4}>
                <SafeAreaView>
                  <ScrollView horizontal={true}>
                    <CardProduct navigation={this.props.navigation}/>
                    <CardProduct navigation={this.props.navigation}/>
                    <CardProduct navigation={this.props.navigation}/>
                    <CardProduct navigation={this.props.navigation}/>
                    <CardProduct navigation={this.props.navigation}/>
                  </ScrollView>
                </SafeAreaView>
              </Row>

              <View>
                <Text style={styles.title}>Popular</Text>
                <Text style={styles.view}>View all</Text>
                <Text style={styles.text}>You’ve never seen it before!</Text>
              </View>
              <Row size={4}>
                <SafeAreaView>
                  <ScrollView horizontal={true}>
                    <CardProduct navigation={this.props.navigation}/>
                    <CardProduct navigation={this.props.navigation}/>
                    <CardProduct navigation={this.props.navigation}/>
                    <CardProduct navigation={this.props.navigation}/>
                    <CardProduct navigation={this.props.navigation}/>
                  </ScrollView>
                </SafeAreaView>
              </Row>
            </ScrollView>
          </SafeAreaView>
        </Grid>

        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-around', height: 50, marginTop: 10 }}>
          <Image style={{ width: 24, height: 24 }} source={require('../assets/icons/home.png')} />
          <Image style={{ width: 24, height: 24 }} source={require('../assets/icons/shop.png')} />
          <Image style={{ width: 24, height: 24 }} source={require('../assets/icons/bag.png')} />
          <Image style={{ width: 24, height: 24 }} source={require('../assets/icons/fav.png')} />
          <Image style={{ width: 24, height: 24 }} source={require('../assets/icons/account.png')} />
        </View> */}
        <BottomNavigator navigation={this.props.navigation} home={true}/>
      </Container>
    );
  }
}

export default Home;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: windowWidth * 0.04,
  },
  title: {
    fontSize: 34,
    marginTop: 20,
    fontFamily: 'Metropolis',
    fontWeight: '700'
  },
  view: {
    alignSelf: 'flex-end',
    fontFamily: 'Metropolis',
  },
  text: {
    fontFamily: 'Metropolis',
    color: '#9B9B9B',
  },
  header: {
    width: windowWidth,
    height: windowHeight * 0.24,
  }
});