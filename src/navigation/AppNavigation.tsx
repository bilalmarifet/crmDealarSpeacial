import React from "react";
import {
  
  createAppContainer,
  createSwitchNavigator,
} from "react-navigation";
import {createStackNavigator} from  'react-navigation-stack'
import { Dimensions, Image } from "react-native";
import {createDrawerNavigator} from 'react-navigation-drawer'
const { width } = Dimensions.get("window");

import Home from "../screens/AppScreens/Home";
import Blank from "../screens/AppScreens/Blank";
import SideBar from "../screens/AppScreens/SideBar";
import Login from "../screens/AuthScreens/Login";
import AuthLoading from "../screens/AuthLoading";
import CartScreen from '../screens/AppScreens/Cart/CartScreen'

import CustomeInfoScreen from '../screens/AppScreens/Cart/CustomerInfoScreen'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { fonts, colors } from "../constants";
import { color } from "react-native-reanimated";
import OrderScreen from '../screens/AppScreens/Order/OrderScreen'
import ProfileScren from '../screens/AppScreens/Order/ProfileScreen'
import {  TouchableHighlight, TouchableWithoutFeedback } from "react-native-gesture-handler";
import {TouchableOpacity } from 'react-native'
const HomeStack = createStackNavigator(
  {
    Home: { screen: Home },
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#D6E4FF',

      },
      headerTitleStyle: {
        fontSize : 18,
        fontFamily : fonts.primaryFont,
  
      }
    },
  },
);

const OrderStack = createStackNavigator(
  {
    Order: { screen: OrderScreen },
    Profile: ProfileScren
  },
  {
    initialRouteName: "Order",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#D6E4FF',

      },
      headerTitleStyle: {
        fontSize : 18,
        fontFamily : fonts.primaryFont,
  
      }
    },
  },
);

const cartStack = createStackNavigator(
  {
    Cart : CartScreen,
    CustomeInfo :CustomeInfoScreen
  },
  {
    initialRouteName: "Cart",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#D6E4FF',

      },
      headerTitleStyle: {
        fontSize : 18,
        fontFamily : fonts.primaryFont,
  
      }
    },
  },
);




const MainStack = createBottomTabNavigator(
  {
    Products: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: 'Ürünler',
        tabBarIcon: ({ focused }) => {

          return (
  focused ? 
  <TouchableWithoutFeedback>
<Image
style={{width:24,height:24}}
source={require('../assets/dairy-products.png')}
/>
  </TouchableWithoutFeedback>
  : <TouchableWithoutFeedback>
  <Image
  style={{width:24,height:24}}
  source={require('../assets/milk.png')}
  />
    </TouchableWithoutFeedback>
          )
        }
      }
    },
    Cart: {
      screen: cartStack,
      navigationOptions: {
        tabBarLabel: 'Sepet',
        // tabBarIcon: ({ focused }) => {
        //   return (
        //     <Icon name="ios-basket" style={{ color: focused ? "#2069F3" : "" }}  ></Icon>
        //   )
        // }
      }
    },
    Order: {
      screen: OrderStack,
      navigationOptions: {
        tabBarLabel: 'Siparişlerim',
        // tabBarIcon: ({ focused }) => {
        //   return (
        //     <Icon name="ios-basket" style={{ color: focused ? "#2069F3" : "" }}  ></Icon>
        //   )
        // }
      }
    },
  },
  {
    initialRouteName: "Products",
  },
);


const AuthStack = createStackNavigator(
  {
    Login: { screen: Login }
  },
  {
    initialRouteName: "Login",
    headerMode: "none"
  }
);



export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      AuthStack: AuthStack,
      AppStack: MainStack
    },
    {
      initialRouteName: "AppStack"
    }
  )
);
