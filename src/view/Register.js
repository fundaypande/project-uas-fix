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
  ActivityIndicator,
  Platform,
 } from 'react-native';
 import { Button } from 'native-base';
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
      email: '',
      nama: '',
      hp: '',
      alamat: '',
      nik: '',
      photo: ''
    };
  }

  onPressButton = () => {
    Alert.alert('Kepencet');
  }

  _pickImage() {
    this.setState({ uploadURL: '' })

    ImagePicker.launchImageLibrary({}, response  => {
      uploadImage(response.uri)
        .then(url => this.setState({ uploadURL: url }))
        .catch(error => console.log(error))
    })
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
      photo: this.state.uploadURL,
    });
    this.props.navigation.navigate('Beranda');
  }

  render() {
    return (
        <View style={styles.container}>
        <StatusBar
          backgroundColor={'transparent'}
          translucent
        />
          <ImageBackground
            source={require('../Assets/img/bg2.jpg')}
            style={styles.backgroundImage}
          >
          <View style={styles.viewSpace} />
          <View style={styles.viewHeader}>
            <Image
              source={require('../Assets/img/logo_layout_ukbm.png')}
              style={styles.logo}
            />
            <Text style={styles.headerText}>
              Your Assignment
            </Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.viewBody}>
            <Text style={styles.BodyText}>
              Sign Up With Username and Password
            </Text>
            <TextInput
              underlineColorAndroid="transparent"
              style={myButton('rgba(255,255,255,0.5)')}
              placeholder="Nama Lengkap"
              onChangeText={TextInputValue => this.setState({ nama: TextInputValue })}
            />
            <TextInput
              underlineColorAndroid="transparent"
              style={myButton('rgba(255,255,255,0.5)')}
              placeholder="NIK"
              onChangeText={TextInputValue => this.setState({ nik: TextInputValue })}
            />
            <TextInput
              underlineColorAndroid="transparent"
              style={myButton('rgba(255,255,255,0.5)')}
              placeholder="No. HP"
              onChangeText={TextInputValue => this.setState({ hp: TextInputValue })}
            />
            <TextInput
              underlineColorAndroid="transparent"
              style={myButton('rgba(255,255,255,0.5)')}
              placeholder="Alamat"
              onChangeText={TextInputValue => this.setState({ alamat: TextInputValue })}
            />


            <View>
              {
                (() => {
                  switch (this.state.uploadURL) {
                    case null:
                      return null
                    case '':
                      return <ActivityIndicator />
                    default:
                      return (
                        <View>
                          <Image
                            source={{ uri: this.state.uploadURL }}
                            style={styles.image}
                          />
                        </View>
                      );
                  }
                })()
              }
              <TouchableOpacity onPress={() => this._pickImage()}>
                <Text style={styles.upload}>
                  Upload Foto Profile
                </Text>
              </TouchableOpacity>
            </View>


            <View style={{ height: 60 }}>
              <Button
                block
                rounded
                style={styles.button}
                onPress={this.createDbRef}
              >
                <Text style={styles.buttonText}>Simpan</Text>
              </Button>
            </View>
          </View>
          </ImageBackground>
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
     marginTop: 10
   };
 };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    width: 300,
    backgroundColor: 'rgba(109, 58, 174, 0.9)',
    marginTop: 10,
    alignSelf: 'center'
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
    fontSize: 25
  },
  footerText: {
    color: '#ffffff',
    fontSize: 12
  },
  BodyText: {
    color: '#ffffff',
    fontSize: 15,
    marginTop: 20,
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 15
  },
  separator: {
    borderBottomColor: '#ffffff',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  logo: {
    width: 80,
    height: 80,
    alignItems: 'center',
    alignSelf: 'center'
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
  image: {
    height: 50,
    width: 50,
    borderRadius: 25,
    resizeMode: 'contain',
  },
  upload: {
    textAlign: 'center',
    color: '#FFFFFF',
    padding: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: 'gray'
  },

});
AppRegistry.registerComponent('AppForm2', () => Login);
