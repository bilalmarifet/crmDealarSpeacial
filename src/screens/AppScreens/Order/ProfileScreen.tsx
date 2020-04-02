import React, { Component } from "react";
import { View, FlatList, ActivityIndicator,Button,Text, Alert} from "react-native";
import { NavigationScreenProp, NavigationState, SafeAreaView } from "react-navigation";
import { connect } from "react-redux";
import { Header } from "../../../components";
import styles from "../styles";
import { AvatarItem } from "../../../components";
import { logoutUserService } from "../../../redux/services/user";
import {Thumbnail,Icon, Item, Label, Input, List, ListItem} from 'native-base'
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

}

interface itemProp {
  item: any;
}

interface State {
  page: number;
  limit: number;
  change :boolean;
}


class ProfileScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      page: 1,
      limit: 20,
      change : false,
    };
  }

  componentDidMount() {

  }



  static navigationOptions = ({navigation }) => {

   return {
    title: 'Profilim',
    headerTintColor: colors.containerBgThird,
    headerStyle: {
      backgroundColor: colors.headerColor,
      height: 100,

    //   headerTitleStyle: {
    //     fontWeight: '600',
    //     fontFamily: 'Avenir Next',
    //     fontSize: 18
    //   },

    },

   }
  };

  



  render() {
    const { navigation, imageData, fetchMoreImageData, loading } = this.props;
    const { page, limit } = this.state;
    return (


      <View style={styles.container}>
          
          <List>
            <ListItem style={{backgroundColor:colors.containerBgSecond}}  itemDivider>
              <Text style={{fontFamily:fonts.primaryFont,fontSize:20}}>Kişisel Bilgiler</Text>
            </ListItem>                    
            <ListItem
             onPress={()=> Alert.alert("asd")}>
              <Text>Kullanıcı Bilgileri</Text>
            </ListItem>
            
          </List>
   


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
)(ProfileScreen);
