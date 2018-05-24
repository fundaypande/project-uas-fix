import React, { Component } from 'react';
import * as firebase from 'firebase';
import {
  AppRegistry,
  View,
  StyleSheet,
  ImageBackground,
  Alert,
  StatusBar,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Platform
 } from 'react-native';
 import { Icon } from 'native-base';
 import ImagePicker from 'react-native-image-picker';
 import RNFetchBlob from 'react-native-fetch-blob';

const storage = firebase.storage();

const uploadImage = (uri, mime = 'image/jpg') => {
  // Prepare Blob support
  const Blob = RNFetchBlob.polyfill.Blob;
  const fs = RNFetchBlob.fs;
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
  window.Blob = Blob;
  const users = firebase.auth().currentUser;
  const uid = users.uid;

  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    const sessionId = new Date().getTime();
    let uploadBlob = null;
    const image1 = storage.ref('users');
    const imageRef = image1.child(uid).child('profile').child('profile');

    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` });
      })
      .then((blob) => {
        uploadBlob = blob;
        return imageRef.put(blob, { contentType: mime });
      })
      .then(() => {
        uploadBlob.close();
        return imageRef.getDownloadURL();
      })
      .then((url) => {
        resolve(url);
      })
      .catch((error) => {
        reject(error);
    });
  });
};

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      photo: '',
      nama: '',
      email: '',
      nik: '',
      alamat: '',
      hp: ''
    };
  }

  componentWillMount() {
    const users = firebase.auth().currentUser;
    const uid = users.uid;
    const starCountRef = firebase.database().ref('users/' + uid);
    starCountRef.on('value', (snapshot) => {
      const userObj = snapshot.val();
      if (userObj != null) {
        const profile = userObj.photo;
        const namaku = userObj.nama;
        const niku = userObj.nik;
        const emailku = userObj.email;
        const hpu = userObj.hp;
        const alamatu = userObj.alamat;
        console.log(profile, namaku);
        this.setState({
          nama: namaku,
          photo: profile,
          nik: niku,
          hp: hpu,
          alamat: alamatu,
          email: emailku
        });
      }
    });
  }

  goBack = () => {
    this.props.navigation.navigate('Profile');
  }

  createDbRef = () => {
    console.log('create masuk');
    const users = firebase.auth().currentUser;
    const uid = users.uid;
    const uemail = users.email;
    const dbRef = firebase.database().ref('users');
    dbRef.child(uid).set({
      email: uemail,
      nama: this.state.nama,
      hp: this.state.hp,
      alamat: this.state.alamat,
      nik: this.state.nik,
      photo: this.state.photo,
    });
    this.props.navigation.navigate('Profile');
  }

  pickImage() {
    this.setState({ uploadURL: '' })

    ImagePicker.launchImageLibrary({}, response  => {
      uploadImage(response.uri)
        .then(url => this.setState({ photo: url }))
        .catch(error => console.log(error))
    })
  }

  render() {
    return (
        <View style={styles.container}>
        <StatusBar
          backgroundColor={'transparent'}
          translucent
        />
          <ImageBackground
            source={require('../Assets/img/bg-profile.png')}
            style={styles.backgroundImage}
          >
          <ScrollView>
          <View style={{width: 300, height: 50, marginTop: 23, flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
            <TouchableOpacity onPress={this.goBack}>
              <Icon name={'ios-arrow-back'} style={{ fontSize: 35, color: '#ffffff' }} />
            </TouchableOpacity>
          </View>
          <View style={{flex: 8}}>
          <View style={styles.viewHeader}>
            <View>
            {
              (() => {
                switch (this.state.photo) {
                  case null:
                    return null
                  case '':
                    return <ActivityIndicator />
                  default:
                    return (
                      <View>
                        <Image
                          source={{ uri: this.state.photo }}
                          style={styles.logo}
                        />
                      </View>
                    );
                }
              })()
            }
            </View>
            <TouchableOpacity onPress={() => this.pickImage()}>
              <Text style={styles.upload}>
                Upload Foto Profile
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.separator} />
          <View style={styles.viewBody}>

          <TextInput
            underlineColorAndroid="transparent"
            style={myButton('rgba(255,255,255,0.5)')}
            placeholder="Nama"
            onChangeText={TextInputValue => this.setState({ nama: TextInputValue })}
            value={this.state.nama}
          />

          <TextInput
            underlineColorAndroid="transparent"
            style={myButton('rgba(255,255,255,0.5)')}
            placeholder="NIK"
            onChangeText={TextInputValue => this.setState({ nik: TextInputValue })}
            value={this.state.nik}
          />


          <TextInput
            underlineColorAndroid="transparent"
            style={myButton('rgba(255,255,255,0.5)')}
            placeholder="Alamat"
            onChangeText={TextInputValue => this.setState({ alamat: TextInputValue })}
            value={this.state.alamat}
          />


          <TextInput
            underlineColorAndroid="transparent"
            style={myButton('rgba(255,255,255,0.5)')}
            placeholder="Handphone"
            onChangeText={TextInputValue => this.setState({ hp: TextInputValue })}
            value={this.state.hp}
          />

          </View>
          </View>
          </ScrollView>
          </ImageBackground>
          <TouchableOpacity onPress={this.createDbRef} style={styles.floating}>
            <Icon name={'ios-send'} style={{ fontSize: 30, color: '#ffffff' }} />
          </TouchableOpacity>
        </View>

    );
  }
}

const myButton = function (bgColor) {
   return {
     width: 300,
     height: 50,
     backgroundColor: bgColor,
     borderRadius: 50,
     paddingLeft: 30,
     marginTop: 10,

   };
 };

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
    alignItems: 'center',
  },
  floating: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ee6e73',
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5
  },
  funFloat: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 0,
    marginBottom: 10,
    paddingTop: 0,
    paddingBottom: 0,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.5)',
    width: 300,
    height: 50,

  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  button: {
    width: 300,
    backgroundColor: 'rgba(109, 58, 174, 0.9)',
    marginTop: 10
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    alignSelf: 'center',
    alignItems: 'center'
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    color: '#ffffff',
    fontSize: 18,
    alignSelf: 'center',
    alignItems: 'center'
  },
  footerText: {
    color: '#ffffff',
    fontSize: 12
  },
  BodyText: {
    color: '#ffffff',
    fontSize: 15,
    marginTop: 10,
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 5
  },
  separator: {
    borderBottomColor: '#ffffff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 15
  },
  logo: {
    width: 80,
    height: 80,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 40,
    marginBottom: 10
  },
  viewHeader: {
    marginBottom: 50
  },
  viewBody: {
    marginBottom: 50
  },
  viewFooter: {
    flexDirection: 'row'
  },
  viewSpace: {

  },
  icon: {
   flex: 1,
   fontSize: 30,
   color: '#34322F',
   marginLeft: 10,
   alignSelf: 'center',
   alignItems: 'center'
 },
 upload: {
   textAlign: 'center',
   color: '#FFFFFF',
   padding: 10,
   marginBottom: 5,
   borderWidth: 1,
   borderColor: '#ffffff'
 },

});
AppRegistry.registerComponent('AppForm2', () => Login);
