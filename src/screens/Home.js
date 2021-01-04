import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  Dimensions,
  Image,
  ImageBackground, SafeAreaView, ScrollView,
} from 'react-native';
import { Container, Card, CardItem } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

class Home extends React.Component {
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
              <Text style={{ fontWeight: 'bold', fontSize: 35 }}> New </Text>
              <Row size={4}>
                <SafeAreaView>
                  <ScrollView horizontal={true}>
                    <Card style={{ height: 300, marginRight: 10 }}>
                      <CardItem cardBody>
                        <View >
                          <Image source={require('./../assets/images/image.png')} />
                          <Image source={require('./../assets/icons/rating.png')} style={{ marginTop: 5 }} />
                          <Text style={{ color: 'gray', marginTop: 5 }}> OVS </Text>
                          <Text style={{ fontWeight: 'bold', fontSize: 15 }}> Product Name </Text>
                          <Text style={{ fontWeight: 'bold', fontSize: 15 }}> 30$ </Text>
                        </View>
                      </CardItem>
                    </Card>
                    <Card style={{ height: 300, marginRight: 10 }}>
                      <CardItem cardBody>
                        <View >
                          <Image source={require('./../assets/images/image2.png')} />
                          <Image source={require('./../assets/icons/rating.png')} style={{ marginTop: 5 }} />
                          <Text style={{ color: 'gray', marginTop: 5 }}> OVS </Text>
                          <Text style={{ fontWeight: 'bold', fontSize: 15 }}> Product Name </Text>
                          <Text style={{ fontWeight: 'bold', fontSize: 15 }}> 30$ </Text>
                        </View>
                      </CardItem>
                    </Card>
                    <Card style={{ height: 300, marginRight: 10 }}>
                      <CardItem cardBody>
                        <View >
                          <Image source={require('./../assets/images/image3.png')} />
                          <Image source={require('./../assets/icons/rating.png')} style={{ marginTop: 5 }} />
                          <Text style={{ color: 'gray', marginTop: 5 }}> OVS </Text>
                          <Text style={{ fontWeight: 'bold', fontSize: 15 }}> Product Name </Text>
                          <Text style={{ fontWeight: 'bold', fontSize: 15 }}> 30$ </Text>
                        </View>
                      </CardItem>
                    </Card>
                    <Card style={{ height: 300, marginRight: 10 }}>
                      <CardItem cardBody>
                        <View >
                          <Image source={require('./../assets/images/image4.png')} />
                          <Image source={require('./../assets/icons/rating.png')} style={{ marginTop: 5 }} />
                          <Text style={{ color: 'gray', marginTop: 5 }}> OVS </Text>
                          <Text style={{ fontWeight: 'bold', fontSize: 15 }}> Product Name </Text>
                          <Text style={{ fontWeight: 'bold', fontSize: 15 }}> 30$ </Text>
                        </View>
                      </CardItem>
                    </Card>
                  </ScrollView>
                </SafeAreaView>
              </Row>

              <Text style={{ fontWeight: 'bold', fontSize: 35 }}> Popular </Text>
              <Row size={4}>
                <SafeAreaView>
                  <ScrollView horizontal={true}>
                    <Card style={{ height: 300, marginRight: 10 }}>
                      <CardItem cardBody>
                        <View >
                          <Image source={require('./../assets/images/image.png')} />
                          <Image source={require('./../assets/icons/rating.png')} style={{ marginTop: 5 }} />
                          <Text style={{ color: 'gray', marginTop: 5 }}> OVS </Text>
                          <Text style={{ fontWeight: 'bold', fontSize: 15 }}> Product Name </Text>
                          <Text style={{ fontWeight: 'bold', fontSize: 15 }}> 30$ </Text>
                        </View>
                      </CardItem>
                    </Card>
                    <Card style={{ height: 300, marginRight: 10 }}>
                      <CardItem cardBody>
                        <View >
                          <Image source={require('./../assets/images/image2.png')} />
                          <Image source={require('./../assets/icons/rating.png')} style={{ marginTop: 5 }} />
                          <Text style={{ color: 'gray', marginTop: 5 }}> OVS </Text>
                          <Text style={{ fontWeight: 'bold', fontSize: 15 }}> Product Name </Text>
                          <Text style={{ fontWeight: 'bold', fontSize: 15 }}> 30$ </Text>
                        </View>
                      </CardItem>
                    </Card>
                    <Card style={{ height: 300, marginRight: 10 }}>
                      <CardItem cardBody>
                        <View >
                          <Image source={require('./../assets/images/image3.png')} />
                          <Image source={require('./../assets/icons/rating.png')} style={{ marginTop: 5 }} />
                          <Text style={{ color: 'gray', marginTop: 5 }}> OVS </Text>
                          <Text style={{ fontWeight: 'bold', fontSize: 15 }}> Product Name </Text>
                          <Text style={{ fontWeight: 'bold', fontSize: 15 }}> 30$ </Text>
                        </View>
                      </CardItem>
                    </Card>
                    <Card style={{ height: 300, marginRight: 10 }}>
                      <CardItem cardBody>
                        <View >
                          <Image source={require('./../assets/images/image4.png')} />
                          <Image source={require('./../assets/icons/rating.png')} style={{ marginTop: 5 }} />
                          <Text style={{ color: 'gray', marginTop: 5 }}> OVS </Text>
                          <Text style={{ fontWeight: 'bold', fontSize: 15 }}> Product Name </Text>
                          <Text style={{ fontWeight: 'bold', fontSize: 15 }}> 30$ </Text>
                        </View>
                      </CardItem>
                    </Card>
                  </ScrollView>
                </SafeAreaView>
              </Row>
            </ScrollView>
          </SafeAreaView>
        </Grid>

        <View style={{flexDirection:'row', justifyContent: 'space-around', height:50, marginTop:10}}>
          <Image style={{ width: 24, height: 24 }} source={require('../assets/icons/home.png')} />
          <Image style={{ width: 24, height: 24 }} source={require('../assets/icons/shop.png')} />
          <Image style={{ width: 24, height: 24 }} source={require('../assets/icons/bag.png')} />
          <Image style={{ width: 24, height: 24 }} source={require('../assets/icons/fav.png')} />
          <Image style={{ width: 24, height: 24 }} source={require('../assets/icons/account.png')} />
        </View>
      </Container>
    );
  }
}

export default Home;