import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/FontAwesome';

import Home from './src/screens/Home';
import Profile from './src/screens/Profile/Profile';
import Login from './src/screens/Auth/login';
import Shop from './src/screens/Shop';
import Bag from './src/screens/MyBag';
import DetailPage from './src/screens/DetailPage'
import Signup from './src/screens/Auth/signup';
import Forgot from './src/screens/Auth/forgot'
import Categories from './src/screens/ShopCategory'
import Order from './src/screens/Profile/MyOrder'
import Shipping from './src/screens/Profile/ShippingAdress'
import Setting from './src/screens/Profile/Settings'
import ChangeAddress from './src/screens/Profile/ChangeAddress'
import AddAddress from './src/screens/Profile/AddAddress'
import DetailOrders from './src/screens/Profile/DetailOrder'
import Filter from './src/screens/Filter'
import Notification from './src/screens/Notification'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      headerMode="none"
      sceneContainerStyle={{ borderWidth: 0 }}
      barStyle={{ borderTopLeftRadius: 20 }}
      tabBarOptions={{
        activeTintColor: '#DB3022',
        style: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => {
            return <Icon name="home" size={25} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Shop"
        component={ShopPage}
        options={{
          tabBarIcon: ({ color }) => {
            return <Icon name="shopping-cart" size={25} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="MyBag"
        component={Bag}
        options={{
          tabBarIcon: ({ color }) => {
            return <Icon name="shopping-bag" size={25} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Login}
        options={{
          tabBarIcon: ({ color }) => {
            return <Icon name="heart" size={25} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={MainProfile}
        options={{
          tabBarIcon: ({ color }) => {
            return <Icon name="user-circle-o" size={25} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

const ShopPage = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Shop" component={Shop} />
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="Filter" component={Filter} />
    </Stack.Navigator>
  );
};

const MainProfile = () => {
  return (
    <Stack.Navigator initialRouteName="MainProfile" headerMode="none">
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Orders" component={Order} />
      <Stack.Screen name="DetailsOrders" component={DetailOrders} />
      <Stack.Screen name="Shipping" component={Shipping} />
      <Stack.Screen name="ChangeAddress" component={ChangeAddress} />
      <Stack.Screen name="AddAddress" component={AddAddress} />
      <Stack.Screen name="Setting" component={Setting} />
    </Stack.Navigator>
  );
};

const appRouter = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Tab" component={MyTabs} />
          <Stack.Screen name="Notification" component={Notification} />
          <Stack.Screen name="DetailPage" component={DetailPage} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Forgot" component={Forgot} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default appRouter;