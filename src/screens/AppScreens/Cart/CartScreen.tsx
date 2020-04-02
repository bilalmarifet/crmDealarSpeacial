import React, { Component } from "react";
import { View, FlatList, ActivityIndicator,Button,Text} from "react-native";
import { NavigationScreenProp, NavigationState, SafeAreaView } from "react-navigation";
import { connect } from "react-redux";
import { Header } from "../../../components";
import styles from "../styles";
import { AvatarItem } from "../../../components";
import { logoutUserService } from "../../../redux/services/user";
import {Thumbnail,Icon} from 'native-base'
import {
  fetchImageData,
  fetchMoreImageData
} from "../../../redux/actions/fetch";
import { TouchableOpacity } from "react-native-gesture-handler";
import { showMessage } from "react-native-flash-message";
import { colors, fonts } from "../../../constants";
import LinearGradient from 'react-native-linear-gradient';



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

class CartScreen extends Component<Props, State> {
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
    title: 'Sepet',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: colors.headerColor,
      height: 100,

      headerTitleStyle: {
        fontWeight: '600',
        fontFamily: 'Avenir Next',
        fontSize: 25
      },

    },
   }
  };
  renderPlusButton(){
    showMessage({
      message: "Hello World",
      description: "This is our second message",
      type: "success",
    });
    if(this.state.change) {
      let cart = this.props.navigation.getParam('cart') ?? 0
      return (
        <View style={{flex:1}} >
        <View style={{flex:1,flexDirection:'row'}}>
          <TouchableOpacity style={{backgroundColor:colors.headerColor,flex:1,justifyContent:'center'}} onPress={()=> {
             this.props.navigation.setParams({cart: cart - 100});
            this.setState({change : !this.state.change})}}><Icon name="minus" type="MaterialCommunityIcons" style={{color:'white'}} /></TouchableOpacity>
          <Text style={{alignSelf:'center',marginLeft:10}}>{this.state.page}</Text>
          <TouchableOpacity style={{backgroundColor:colors.headerColor,flex:1,justifyContent:'center',marginLeft:10,borderTopRightRadius:5,borderBottomRightRadius:5}} onPress={()=> {
            this.props.navigation.setParams({cart: cart + 100});
            this.setState({page:this.state.page + 1})}}><Icon name="plus" type="MaterialCommunityIcons" style={{color:'white'}} /></TouchableOpacity>
          </View> 
       </View>
      )
    }
    else {
      let cart = this.props.navigation.getParam('cart') ?? 0
      return (
//         <TouchableOpacity onPress={()=> {
        
// <Icon name="ios-add-circle" style={{color : colors.iconColorSecond}}/>
//        </TouchableOpacity>


<View style={{flex:1}}>
<View style={{flex:1,flexDirection:'row'}}>
<TouchableOpacity style={{backgroundColor:colors.headerColor,flex:1,justifyContent:'center',borderTopRightRadius:5,borderBottomRightRadius:5}} onPress={()=> {
   this.props.navigation.setParams({cart: cart + 100});
   this.setState({change : !this.state.change})}}>

<Icon name="plus" type="MaterialCommunityIcons" style={{color:'white'}} /></TouchableOpacity>
 

</View>
</View>

     )
    }
  }

  render() {
    const { navigation, imageData, fetchMoreImageData, loading } = this.props;
    const { page, limit } = this.state;
    return (
      <View style={styles.container}>
       
      
        <FlatList
        contentContainerStyle={{paddingTop:20}}
          data={[1,2,2,2]}

          keyExtractor={item => item.id}
          renderItem={({ item }: itemProp) => {
            return (
             <View style={styles.item}>
              <View style={{paddingVertical:10}}>
              <Text style={{fontFamily:fonts.primaryFont,color:colors.textColor,fontWeight:'bold'}}>
                 Damacana Su
               </Text>
               
               </View>

            <View style={{height:'100%'}}>
            {this.renderPlusButton()}
              </View>
               </View>
            );
          }}
          
        />
        <View style={{position:"absolute",bottom:0,left:0,right:0,backgroundColor:colors.containerBgSecond,flexDirection:'row',paddingTop:10,paddingHorizontal:10,paddingBottom:10,justifyContent:'space-between'}}>
        <View style={{flexDirection:'row'}}>
        <Text style={{fontFamily:fonts.primaryFont,fontWeight:'600',fontSize:18,alignSelf:'center'}}>
            TOPLAM:
        </Text>
        <Text style={{fontFamily:fonts.primaryFont,alignSelf:'center',marginLeft:5}}>
        150,99 TL
        </Text>
        </View>
       <TouchableOpacity onPress={()=> this.props.navigation.navigate('CustomeInfo')}
        style={{flexDirection:'row',backgroundColor:colors.headerColor,borderRadius:5,padding:5}}>
           <Icon name="cart" style={{color:'white'}} />
           <Text style={{alignSelf:'center',marginLeft:10,color:'white'}}>Alışverişi Tamamla</Text>
       </TouchableOpacity>
        </View>
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
)(CartScreen);
