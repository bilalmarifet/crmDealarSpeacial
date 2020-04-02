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

class Home extends Component<Props, State> {
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
    title: 'Ürünler',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: colors.headerColor,
      height: 100,

      headerTitleStyle: {
        fontWeight: '600',
        fontFamily: 'Avenir Next',
        fontSize: 50
      },

    },
  headerRight: 
  (navigation.state.params && navigation.state.params.cart ) ? <TouchableOpacity onPress={()=> navigation.navigate('Cart')}
  style={{marginRight:10}}><LinearGradient 
  start={{x :0, y:0.5}}
  end={{x:1, y:0.5}}
  colors={['#EFFAF7', '#A9CDCC']}
  style={{borderRadius: 5}}><View style={{borderWidth:0,borderRadius:5,padding:5,flexDirection:'row',backgroundColor:'white',margin:1}}>
   <Icon style={{color:colors.iconColor}} name="cart"></Icon>
  
  <Text style={{alignSelf:'center',marginLeft:10,color:colors.textColor}}>{navigation.state.params.cart} TL</Text>
  </View>
  </LinearGradient>
 
  </TouchableOpacity> : null
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
        <View style={{flex:1,borderWidth:0,flexDirection:'row',borderRadius:0}}>
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
               <Text style={{fontFamily:fonts.primaryFont,marginTop:10,color:colors.textColor}}>
                 19 Tl
               </Text>
               <Text style={{fontFamily:fonts.primaryFont,marginTop:10,color:colors.textColor,fontWeight:'300'}}>
                 Açıklama : 19 litre olarak verilecektir.
               </Text>
               </View>

            <View style={{height:'100%'}}>
            {this.renderPlusButton()}
              </View>
               </View>
            );
          }}
          
        />
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
)(Home);
