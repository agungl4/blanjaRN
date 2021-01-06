import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import Home from './src/screens/Home';
import DetailPage from './src/screens/DetailPage'
import MyBag from './src/screens/MyBag'
import Login from './src/screens/auth/login';
import Signup from './src/screens/auth/signup';
import Forgot from './src/screens/auth/forgot'
import Shop from './src/screens/Shop'
import Categories from './src/screens/ShopCategory'
import Profile from './src/screens/profile/Profile'
import Order from './src/screens/profile/MyOrder'
import Shipping from './src/screens/profile/ShippingAdress'
import Setting from './src/screens/profile/Settings'
import ChangeAddress from './src/screens/profile/ChangeAddress'
import AddAddress from './src/screens/profile/AddAddress'
import DetailOrders from './src/screens/profile/DetailOrder'
import Filter from './src/screens/Filter'

const Stack = createStackNavigator();
const appRouter = () => {
  useEffect(() => {
      SplashScreen.hide();
  });
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        {/* <Stack.Screen name='Splash' component={Splash} options={{ headerShown: false }} /> */}
        <Stack.Screen name="Home" component={Home}  />
        <Stack.Screen name="DetailPage" component={DetailPage}  />
        <Stack.Screen name="Shop" component={Shop}  />
        <Stack.Screen name="Categories" component={Categories}  />
        <Stack.Screen name="MyBag" component={MyBag}  />
        <Stack.Screen name="Login" component={Login}  />
        <Stack.Screen name="Signup" component={Signup}  />
        <Stack.Screen name="Forgot" component={Forgot}  />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Orders" component={Order} />
        <Stack.Screen name="Shipping" component={Shipping} />
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="ChangeAddress" component={ChangeAddress} />
        <Stack.Screen name="AddAddress" component={AddAddress} />
        <Stack.Screen name="DetailsOrders" component={DetailOrders} />
        <Stack.Screen name="Filter" component={Filter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default appRouter;