import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  PixelRatio,
  width,
  height,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  AsyncStorage,
} from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code

var panjang=150;
var lebar= Dimensions.get('window').width/360;
var tinggi= Dimensions.get('window').height/640;
var status=true;
//var lebar= 1;
//var tinggi= 1;
var api={
  masukPesen(nama, sandi){
    var url='http://128.199.189.101/back/public/index.php/example/login/'+nama+'/'+sandi;
    return fetch(url,{method: 'POST',}).then((responDidapat)=>responDidapat.json());
  },
}

class ScarletScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArrayDariLogin:[],
      Username: "",
      Password:"",
      tokens:""
    }
  }
  saveToken(){
    AsyncStorage.setItem('tokens',this.state.tokens);
  }
  displayToken=async()=>{
    try{
      let user=await AsyncStorage.getItem('tokens');
      alert(user);
    }
    catch(error){
      alert(user);
    }
  }
  prosesLogin(){
    console.log('prosesFungsi');
    return api.masukPesen(this.state.Username, this.state.Password)
        .catch((error) => console.warn("fetch error:", error))
        .then((responUdahJson)=>{
          this.setState({
            tokens: responUdahJson.token
          })     
          }
        );
   
  }
  FungsiLogin(){
    console.log('masukFungsi');
    return Promise.all([this.prosesLogin()]).then((responUdahJson) => {
      this.cekData();
    })
  }
  cekData()
  {
    if (this.state.tokens === ""||this.state.tokens===undefined) {
      console.log('kosong');
    } 
    else {
      console.log('isi');
      this.saveToken();
      Actions.gray();
    } 
  }
  render(){
    return (
    <View>
      <View style={styles.AreaPassword}>
        <TextInput onChangeText={(text) => this.setState({Username:text})} placeholder='Username' style={styles.PasswordTextbox} placeholderTextColor='#bbbbbb' underlineColorAndroid='#bbbbbb'  />
      </View>
      <View style={styles.AreaPassword}>
        <TextInput onChangeText={(text) => this.setState({Password:text})} placeholder='Password' style={styles.PasswordTextbox} placeholderTextColor='#bbbbbb' underlineColorAndroid='#bbbbbb'  secureTextEntry={status} />
      </View>
      <View style={styles.AreaButtonLogin}>
        <TouchableOpacity style={styles.ButtonLogin} onPress={() =>this.FungsiLogin() }>
          <Text style={{textAlign: 'center', paddingTop:5*tinggi,fontFamily:'Roboto-Bold',fontSize: 18*lebar*tinggi,}}>Login</Text>
        </TouchableOpacity>
      </View> 
    </View>
  );
}
}

const styles = StyleSheet.create({
  AreaLogoMindstore:{ 
    marginTop:100*tinggi,
    alignItems: 'center',
    justifyContent: 'center',
  },
  LogoMindstoreGambar:{
    width:68*lebar,
    height:47*tinggi,
    resizeMode: 'contain' 
  },
  LogoMindstoresText:{
    fontFamily: "HelveticaNeue",
    fontSize: 7*lebar*tinggi,
    textAlign: 'center', 
    color: '#bbbbbb',
    paddingTop:5*tinggi,
  },
  forgetPassword: {
    width: 94*lebar,
    height: 18*tinggi,
    fontFamily: "Roboto-Light",
    fontSize: 10*lebar*tinggi,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: -0.31,
    color: '#bbbbbb',
    position: 'absolute'
  },
  AreaForgetPassword:{
    marginTop:40*tinggi,
    marginLeft:69*lebar, 
  },
  ButtonLogin:{
    width: 280*lebar,
    height: 40*tinggi,
    backgroundColor: '#ffdd00',
    borderRadius: 20*lebar*tinggi,
  },
 
  AreaButtonLogin:{
    paddingTop:38*tinggi,
    alignItems: 'center',
    justifyContent: 'center',
  },
  AreaPassword:{
    paddingTop:20*tinggi,
    justifyContent: 'center',
    alignItems: 'center',
  },
  PasswordTextbox:{
    width: 280*lebar,
    height: 50*tinggi,
  },
  AreaWelcomeBack : {
    paddingLeft:40*lebar,
    paddingTop:20*tinggi,
  },
  welcomeBackText:{
    width: 193*lebar,
    height: 68*tinggi,
    fontFamily: "Roboto-Light",
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 1,
    textAlign: "left",
    color: '#000000',
    fontSize: 20*lebar*tinggi,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bb0000',
  },
  AreaLogo : {
    paddingLeft:48*lebar,
    paddingTop:59*tinggi,
  },
  GambarLogo:
  {
    width:57*lebar,
    height:61*tinggi,
    resizeMode: 'contain' 
  },
  welcome: {
    fontSize: panjang,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    fontFamily:'CANDY',
  },
  rectangleAtas : {
    width: 360*lebar,
    height: 240*tinggi,
    backgroundColor: '#ffdd00'
  },
});

export default ScarletScreen;