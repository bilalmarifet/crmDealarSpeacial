import React, { Component } from "react";
import { View, FlatList, ActivityIndicator,Button,Text, Alert} from "react-native";
import { NavigationScreenProp, NavigationState, SafeAreaView } from "react-navigation";
import { connect } from "react-redux";
import { Header } from "../../../components";
import styles from "../styles";
import { AvatarItem } from "../../../components";
import { logoutUserService } from "../../../redux/services/user";
import {Thumbnail,Icon, Item, Label, Input} from 'native-base'
import {
  fetchImageData,
  fetchMoreImageData
} from "../../../redux/actions/fetch";
import { TouchableOpacity } from "react-native-gesture-handler";
import { showMessage } from "react-native-flash-message";
import { colors, fonts } from "../../../constants";
import LinearGradient from 'react-native-linear-gradient';

import * as Yup from 'yup'; // for everything


import { Formik } from "formik";


interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  fetchImageData: (page?: number, limit?: number) => void;
  fetchMoreImageData: (page?: number, limit?: number) => void;
  imageData: any;
  loading: boolean;
}

interface itemProp {
  item: any;
}

interface State {
  page: number;
  limit: number;
  change :boolean;
}


class OrderScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      page: 1,
      limit: 20,
      change : false,
    };
  }

  componentDidMount() {
    const { fetchImageData } = this.props;
    const { page, limit } = this.state;
    fetchImageData(page, limit);
    // this.props.navigation.setParams({cart: 1});
  }

  handleLogout = () => {
    const { navigation } = this.props;
    logoutUserService().then(() => {
      navigation.navigate("AuthStack");
    });
  };

  static navigationOptions = ({navigation }) => {

   return {
    title: 'Siparişlerim',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: colors.headerColor,
      height: 100,

      headerTitleStyle: {
        fontWeight: '600',
        fontFamily: 'Avenir Next',
        fontSize: 18
      },

    },
    headerRight: () => (
        <TouchableOpacity onPress={()=>navigation.navigate('Profile')}>
            <Icon name="ios-settings"
            
             style={{marginRight:10,color:colors.containerBgThird}}/>
        </TouchableOpacity>

      ),
   }
  };


  render() {

    return (


      <View style={styles.container}>
          
      <TouchableOpacity style={{borderWidth:0,margin:10,borderRadius:5,padding:10,borderColor:colors.borderColor,backgroundColor:colors.containerBgInner
      ,shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.32,
      shadowRadius: 5.46,
      
      elevation: 9,
      }}>
        <View style={{flexDirection:'row'}}>
          <Text>
            Sipariş Tutarı : 100 TL
          </Text>

        </View>
      </TouchableOpacity>
   


      </View>
    );
  }
}

const mapStateToProps = (state: any) => ({
  imageData: state.data,
  loading: state.loading
});

function bindToAction(dispatch: any) {
  return {
    fetchImageData: (page?: number, limit?: number) =>
      dispatch(fetchImageData(page, limit)),
    fetchMoreImageData: (page?: number, limit?: number) =>
      dispatch(fetchMoreImageData(page, limit))
  };
}

export default connect(
  mapStateToProps,
  bindToAction
)(OrderScreen);
