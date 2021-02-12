import React, { useState, useEffect } from 'react';
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
import PushNotification from 'react-native-push-notification';
import { showNotification } from '../notif';
import { useSelector } from 'react-redux'
import { useSocket } from '../utils/context/SocketProvider';

let number = 0;

const Home = ({ navigation }) => {
  const auth = useSelector((state) => state.auth)
  const [products, setProducts] = useState([])
  const [popular, setPopular] = useState([])
  const [loading, setLoading] = useState(true)
  const channel = 'notif'
  const socket = useSocket()

  useEffect(() => {
    axios.get(REACT_APP_BASE_URL + '/products')
      .then(({ data }) => {
        setProducts(data.data.products)
      }).catch((error) => {
        // console.log(error.response)
      })
    axios.get(REACT_APP_BASE_URL + '/products?sortBy=rating&orderBy=desc')
      .then(({ data }) => {
        setPopular(data.data.products)
        setLoading(false)
      }).catch((error) => {
        // console.log(error.response)
      })
  }, [])

  useEffect(() => {
    PushNotification.createChannel(
      {
        channelId: 'notif',
        channelName: 'My Notification channel',
        channelDescription: 'A channel to categories your notification',
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      (created) => console.log(`createchannel returned '${created}'`),
    );

    PushNotification.getChannels((channel_ids) => {
      console.log(channel_ids);
    });
  }, [channel])

  useEffect(() => {
    number++;
    if (auth.level == 1) {
      socket.on('forBuyer', (message) => {
        const notifData = {
          user_id: auth.id,
          level: auth.level,
          title: 'Horee,',
          message: message
        }
        axios.post(REACT_APP_BASE_URL + '/notif/add', notifData)
          .then(({ data }) => {
            showNotification('Notification', message, channel);
          }).catch(({ response }) => {
            console.log(response.data)
          })
      })
      return () => socket.off('forBuyer');
    } else if (auth.level == 2) {
      socket.on('forSeller', (message) => {
        const notifData = {
          user_id: auth.id,
          level: auth.level,
          title: 'Horee~',
          message: message
        }
        axios.post(REACT_APP_BASE_URL + '/notif/add', notifData)
          .then(({ data }) => {
            showNotification('Notification', message, channel);
          }).catch(({ response }) => {
            console.log(response.data)
          })

      })
      return () => socket.off('forSeller');
    }
  }, [number])

  const Refresh = () => {
    axios.get(REACT_APP_BASE_URL + '/products')
      .then(({ data }) => {
        setProducts(data.data.products)
      }).catch((error) => {
        // console.log(error.response)
      })
    axios.get(REACT_APP_BASE_URL + '/products?sortBy=rating&orderBy=desc')
      .then(({ data }) => {
        // console.log(data)
        setPopular(data.data.products)
      }).catch((error) => {
        // console.log(error.response)
      })
  }

  return (
    <View style={{ flex: 1 }}>

      <SafeAreaView>
        <ScrollView>
          <View style={{ height: 180 }}>
            <ImageBackground style={{ width: '100%', height: '100%' }} source={require('../assets/images/header.png')}>
              <View style={{ position: 'absolute', left: 0, bottom: 0, marginBottom: 15, marginLeft: 10 }}>
                <Text style={{ fontSize: 35, fontWeight: 'bold', color: '#fff' }}> Street Clothes</Text>
              </View>

              <View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Notification')
                  }}
                  style={{ position: 'absolute', right: 20, top: 40 }}
                >
                  <Image source={require('../assets/icons/bell.png')} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={Refresh}
                  style={{ position: 'absolute', right: 20, top: 130 }}
                >
                  <Image source={require('../assets/icons/refresh.png')} />
                </TouchableOpacity>
              </View>


            </ImageBackground>
          </View>
          <View>
            <View style={{ marginBottom: 10 }}>
              <View style={{ height: 350, marginLeft: 10, marginRight: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.title}>New</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.text}>You've never seen it before!</Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                    <Text>View All</Text>
                  </TouchableOpacity>
                </View>
                <SafeAreaView>
                  <ScrollView
                    horizontal={true}
                  >
                    {
                      products && products.map(({ id, product_name, product_price, product_img, category_name, color_name, size_name, rating, dibeli }) => {
                        let img = product_img.split(',')[0]
                        return (
                          <>
                            <CardProduct new={true} key={id} navigation={navigation} name={product_name} price={product_price} image={img} id={id} category={category_name} color={color_name} size={size_name} rating={rating} dibeli={dibeli} />
                          </>
                        )
                      })
                    }
                  </ScrollView>
                </SafeAreaView>
              </View>
              <View style={{ height: 350, marginLeft: 10, marginTop: 50, marginBottom: 40 }}>
                <Text style={styles.title}>Popular</Text>
                <Text style={styles.text}>Find clothes that are trending recently</Text>
                <SafeAreaView>
                  <ScrollView
                    horizontal={true}
                  >
                    {
                      popular && popular.map(({ id, product_name, product_price, product_img, category_name, color_name, size_name, rating, dibeli }) => {
                        let img = product_img.split(',')[0]
                        return (
                          <>
                            <CardProduct navigation={navigation} key={id} name={product_name} price={product_price} image={img} id={id} category={category_name} color={color_name} size={size_name} rating={rating} dibeli={dibeli} />
                          </>
                        )
                      })
                    }
                  </ScrollView>
                </SafeAreaView>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

    </View>
  )

}

export default Home
// class Home extends React.Component {
//   constructor(props) {
//     super(props)
//   }

//   state = {
//     products: [],
//     productNew: [],
//   }
//   getNewProducts = () => {
//     axios.get(REACT_APP_BASE_URL + '/products?sortBy=updated_at&orderBy=desc')
//       .then(({ data }) => {
//         this.setState({
//           productNew: data.data.products,
//         })
//       }).catch(err => {
//         console.log(err)
//       })
//   }

//   getPopularProducts = () => {
//     axios.get(REACT_APP_BASE_URL + '/products?sortBy=rating&orderBy=desc')
//       .then(({ data }) => {
//         this.setState({
//           products: data.data.products,
//         })
//       }).catch(err => {
//         console.log(err)
//       })
//   }

//   refresh = () => {
//     this.getNewProducts()
//     this.getPopularProducts()
//   }

//   componentDidMount = () => {
//     this.getNewProducts()
//     this.getPopularProducts()
//   }
//   render() {
//     const { products, productNew, pageInfo } = this.state;
//     return (
//       <Container>
//         <SafeAreaView>
//           <ScrollView vertical={true}>
// <View style={{ height: 180 }}>
//   <ImageBackground style={{ width: '100%', height: '100%' }} source={require('../assets/images/header.png')}>
//     <View style={{ position: 'absolute', left: 0, bottom: 0, marginBottom: 15, marginLeft: 10 }}>
//       <Text style={{ fontSize: 35, fontWeight: 'bold', color: '#fff' }}> Street Clothes</Text>
//     </View>

//     <View>
//       <TouchableOpacity
//         onPress={() => {
//           this.props.navigation.navigate('Notification')
//         }}
//         style={{ position: 'absolute', right: 20, top: 40 }}
//       >
//         <Image source={require('../assets/icons/bell.png')} />
//       </TouchableOpacity>

//       <TouchableOpacity
//         onPress={this.refresh}
//         style={{ position: 'absolute', right: 20, top: 130 }}
//       >
//         <Image source={require('../assets/icons/refresh.png')} />
//       </TouchableOpacity>
//     </View>


//   </ImageBackground>
// </View>

//             <Grid>
//               <View>
//                 <Text style={styles.title}>New</Text>
//                 <TouchableOpacity onPress={() => {
//                   this.props.navigation.navigate('Categories', {
//                     ctgId: 'new',
//                     ctgName: 'New Products'
//                   })
//                 }}>
//                   <Text style={styles.view}>View all</Text>
//                 </TouchableOpacity>

//                 <Text style={styles.text}>You’ve never seen it before!</Text>
//               </View>
//               <Row size={4}>
//                 <SafeAreaView>
//                   <ScrollView horizontal={true}>
//                     {
//                       productNew && productNew.map(({ id, product_name, product_price, category_name, product_img, rating, dibeli }) => {
//                         let img = product_img.split(',')[0];
//                         return (
//                           <CardProduct id={id} name={product_name} price={product_price} category={category_name} image={img} rating={rating} dibeli={dibeli} navigation={this.props.navigation} />
//                         )
//                       })
//                     }
//                   </ScrollView>
//                 </SafeAreaView>
//               </Row>

//               <View>
//                 <Text style={styles.title}>Popular</Text>
//                 <Text style={styles.view}>View all</Text>
//                 <Text style={styles.text}>You’ve never seen it before!</Text>
//               </View>
//               <Row size={4}>
//                 <SafeAreaView>
//                   <ScrollView horizontal={true}>
//                     {
//                       products && products.map(({ id, product_name, product_price, category_name, product_img, rating, dibeli }) => {
//                         let img = product_img.split(',')[0];
//                         return (
//                           <CardProduct id={id} name={product_name} price={product_price} category={category_name} image={img} rating={rating} dibeli={dibeli} navigation={this.props.navigation} />
//                         )
//                       })
//                     }
//                   </ScrollView>
//                 </SafeAreaView>
//               </Row>
//             </Grid>
//           </ScrollView>
//         </SafeAreaView>
//       </Container>
//     );
//   }
// }

// export default Home;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: windowWidth * 0.04,
  },
  title: {
    fontSize: 34,
    fontFamily: 'Metropolis',
    fontWeight: '700',
    color: 'black'
  },
  view: {
    alignSelf: 'flex-end',
    fontFamily: 'Metropolis',
  },
  text: {
    fontFamily: 'Metropolis',
    color: '#9B9B9B',
    marginBottom: 15
  },
  header: {
    width: windowWidth,
    height: windowHeight * 0.24,
  }
});