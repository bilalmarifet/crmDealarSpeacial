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
        tabBarOptions: {
          labelStyle: {
            color:colors.headerColor
          },
        },
        tabBarIcon: ({ focused }) => {

          return (
  focused ? 

<Image
style={{width:24,height:24}}
source={require('../assets/plastic-4.png')}
/>

  :
  <Image
  style={{width:24,height:24}}
  source={require('../assets/plastic-5.png')}
  />

          )
        }
      }
    },
    Cart: {
      screen: cartStack,
      navigationOptions: {
        tabBarLabel: 'Sepet',
        tabBarOptions: {
          labelStyle: {
            color:colors.headerColor
          },
        },

        tabBarIcon: ({ focused }) => {

          return (
  focused ? 

<Image
style={{width:24,height:24}}
source={require('../assets/shopping-cart.png')}
/>

  :
  <Image
  style={{width:24,height:24}}
  source={require('../assets/shopping-cart-2.png')}
  />)}
      }
    },
    Order: {
      screen: OrderStack,
      navigationOptions: {
        tabBarLabel: 'Siparişlerim',
        tabBarOptions: {
          labelStyle: {
            color:colors.headerColor
          },
        },
        tabBarIcon: ({ focused }) => {

          return (
  focused ? 

<Image
style={{width:24,height:24}}
source={require('../assets/order-2.png')}
/>

  :
  <Image
  style={{width:24,height:24}}
  source={require('../assets/checklist.png')}
  />)}
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
