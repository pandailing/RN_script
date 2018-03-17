import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Alert,
  TouchableOpacity,
  Button,
  TextInput
} from 'react-native';

class GrayScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token:'',
      pesan1: 'hello world',
      TokenUdahIsi:false,
      dataMobil:[
      ],
      mobilDicari:'',
      dataUdahIsi:false,

    };
  }
  displayToken=async()=>{
    try{
      await AsyncStorage.getItem('tokens')
      .then((value)=>this.setState({token:value}))
      .then(()=>this.setState({TokenUdahIsi:true}))
      console.log(this.state.token);
    }
    catch(error){
    }
  }
  aksesApi(jenisMobil){
    this.setState({dataMobil: []})
    return Promise.all([this.aksesApiConnect(jenisMobil)]);
  }
  aksesApiConnect(jenisMobil)
  {
    var url='http://128.199.189.101/back/public/index.php/example/vehicle_list';
    return fetch(url,{
      method: 'POST', 
      headers: {
        //Accept: 'application/json',
        'Authorization':'Bearer '+this.state.token,
        //'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "search": jenisMobil,
      }),
    })
    .then((responDidapat)=>responDidapat.json())
    .then((responUdahJson) => {
      console.log(responUdahJson);
      this.setState({dataMobil: responUdahJson.rows});
      if (responUdahJson.rows.length === 0||responUdahJson.rows===undefined) {
        this.setState({dataUdahIsi:false});
      } 
      else {
        this.setState({dataUdahIsi:true});
      }
      
    })
    ;
  }
  cekData()
  {
    if (this.state.dataMobil===undefined) {
      console.log('gagal');
    } 
    else {
      console.log('ok');
    } 
  }

  alertApi(id){
    return Promise.all([this.alertApiConnect(id)]);
  }
  alertApiConnect(id){
    var url='http://128.199.189.101/back/public/index.php/example/vehicle_view';
    return fetch(url,{
      method: 'POST', 
      headers: {
        Accept: 'application/json',
        Authorization:'Bearer '+this.state.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "kendaraanid": id,
      }),
    })
    .then((responDidapat)=>responDidapat.json())
    .then((responUdahJson) => {
      Alert.alert("info","nopol: "+responUdahJson.nopolisi+
      " deskripsi: "+responUdahJson.deskripsi+
      " Merk Tipe: "+responUdahJson.merk_type+
      " tahun:  "+responUdahJson.tahun 
    )
    })
    ;
  }

  componentWillMount(){
    this.displayToken();
  }
  render(){
  const buttons=this.state.dataMobil;
  const renderedButtons=this.state.dataUdahIsi?this.state.dataMobil.map(b => {
    return <Button color="#ffdd00" key={b.kendaraanid} title={b.deskripsi} onPress={()=>this.alertApi(b.kendaraanid)} />
  }):<Text style={{textAlign: 'center', paddingTop:5,fontFamily:'Roboto-Bold',fontSize: 18,}}>Data Kosong</Text>;

  /*const renderedButtons =  buttons.map(b => {
    return <Button key={b.kendaraanid} title={b.deskripsi} />;
  });*/

  const dataIsi=this.state.TokenUdahIsi?this.state.token:'hello';
      return (
        <View>
          <View style={styles.AreaPassword}>
            <TextInput onChangeText={(text) => this.setState({mobilDicari:text})} placeholder='Ketik Mobil Dicari' style={styles.PasswordTextbox} placeholderTextColor='#bbbbbb' underlineColorAndroid='#bbbbbb'  />
          </View>
          <View style={styles.AreaButtonLogin}>
            <TouchableOpacity style={styles.ButtonLogin} onPress={()=>this.aksesApi(this.state.mobilDicari) }>
              <Text style={{textAlign: 'center', paddingTop:5,fontFamily:'Roboto-Bold',fontSize: 18,}}>Cari</Text>
            </TouchableOpacity>
          </View> 
          <View>
            {renderedButtons}
          </View>
          
        </View>
      );   
}
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bb0000',
  },
  ButtonLogin:{
    width: 280,
    height: 40,
    backgroundColor: '#ffdd00',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rectangleAtas : {
    width: 360,
    height: 240,
    backgroundColor: '#ffdd00'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#000000',
  },
  AreaButtonLogin:{
    paddingTop:38,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GrayScreen;