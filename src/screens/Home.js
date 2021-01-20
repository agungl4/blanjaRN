import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  ImageBackground, SafeAreaView, ScrollView, StyleSheet
} from 'react-native';
import { Container } from 'native-base';
import { Row, Grid } from 'react-native-easy-grid';
import CardProduct from '../components/CardProduct'
import axios from 'axios'
import { REACT_APP_BASE_URL } from "@env"

// const REACT_APP_BASE_URL = "https://cae76b1ad0d4.ngrok.io"
class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    products: [],
    productNew: [],
  }
  getNewProducts = () => {
    axios.get(REACT_APP_BASE_URL + '/products?sortBy=updated_at&orderBy=desc')
      .then(({ data }) => {
        // console.log(data.data.products)
        this.setState({
          productNew: data.data.products,
        })
      }).catch(err => {
        console.log(err)
      })
  }

  getPopularProducts = () => {
    axios.get(REACT_APP_BASE_URL + '/products?sortBy=created_at').then(({ data }) => {
      // console.log(data)
      this.setState({
        products: data.data.products,
      })
    }).catch(err => {
      console.log(err)
    })
  }

  componentDidMount = () => {
    this.getNewProducts()
    this.getPopularProducts()
  }
  render() {
    const { products, productNew, pageInfo } = this.state;
    // console.log(REACT_APP_BASE_URL)
    return (
      <Container>
        <View style={{ height: 180 }}>
          <ImageBackground style={{ width: '100%', height: '100%' }} source={require('../assets/images/header.png')}>
            <View style={{ position: 'absolute', left: 0, bottom: 0, marginBottom: 15, marginLeft: 10 }}>
              <Text style={{ fontSize: 35, fontWeight: 'bold', color: '#fff' }}> Street Clothes</Text>
            </View>

            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate('Notification')
                }}
                style={{ position: 'absolute', right: 20, top: 20 }}
            >
                    <Image source={require('../assets/icons/bell.png')} />
            </TouchableOpacity>


          </ImageBackground>
        </View>

        <Grid>
          <SafeAreaView>
            <ScrollView vertical={true}>
              <View>
                <Text style={styles.title}>New</Text>
                <TouchableOpacity onPress={() => {
                  this.props.navigation.navigate('Categories', {
                    ctgId: 'new',
                    ctgName: 'New Products'
                  })
                }}>
                  <Text style={styles.view}>View all</Text>
                </TouchableOpacity>

                <Text style={styles.text}>You’ve never seen it before!</Text>
              </View>
              <Row size={4}>
                <SafeAreaView>
                  <ScrollView horizontal={true}>
                    {
                      productNew && productNew.map(({ product_id, product_name, product_price, category_name, product_img }) => {
                        let img = product_img.split(',')[0];
                        // console.log(img);
                        return (
                          <CardProduct id={product_id} name={product_name} price={product_price} category={category_name} image={img} navigation={this.props.navigation} />
                        )
                      })
                    }
                    {/* <CardProduct navigation={this.props.navigation} /> */}
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
                    {
                      products && products.map(({ product_id, product_name, product_price, category_name, product_img }) => {
                        let img = product_img.split(',')[0];
                        return (
                          <CardProduct id={product_id} name={product_name} price={product_price} category={category_name} image={img} navigation={this.props.navigation} />
                        )
                      })
                    }
                    {/* <CardProduct navigation={this.props.navigation}  /> */}
                  </ScrollView>
                </SafeAreaView>
              </Row>
            </ScrollView>
          </SafeAreaView>
        </Grid>

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