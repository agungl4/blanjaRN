import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import Home from './src/screens/Home';
import Login from './src/screens/auth/login';
import Signup from './src/screens/auth/signup';
import Forgot from './src/screens/auth/forgot'
const Stack = createStackNavigator();

const appRouter = () => {
  useEffect(() => {
      SplashScreen.hide();
  });
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name='Splash' component={Splash} options={{ headerShown: false }} /> */}
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name="Forgot" component={Forgot} options={{ headerShown: false }} />
        {/* <Stack.Screen name="Profile" component={Profile} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default appRouter;