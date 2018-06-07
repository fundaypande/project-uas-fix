import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Container, Content, Form, Button, Item, Input, Label, Picker, Icon, Title } from 'native-base';
import { View, Image, AppRegistry, TextInput, Alert, TouchableOpacity, StyleSheet, Text,ActivityIndicator,Platform } from 'react-native';
import CustomHeader from '../CustomHeader.js';
import ImagePicker from 'react-native-image-picker';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import * as firebase from 'firebase';


    const storage = firebase.storage();
    const sessionId = new Date().getTime();

    const uploadImage = (uri, mime = 'application/pdf') => {
      // Prepare Blob support
      const Blob = RNFetchBlob.polyfill.Blob;
      const fs = RNFetchBlob.fs;
      window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
      window.Blob = Blob;
      const users = firebase.auth().currentUser;
      const uid = users.uid;

      return new Promise((resolve, reject) => {
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

        let uploadBlob = null;
        const imageRef = storage.ref('files/' + sessionId);

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

   export default class Print extends Component {

     constructor(props) {
       super(props);
       this.state = {
         nama: '',
         ket: '',
         photo: ''
       };
     }

     onPressButton = () => {
       Alert.alert('Kepencet');
     }

     _pickImage() {
       this.setState({ uploadURL: '' })

       DocumentPicker.show({
       filetype: [DocumentPickerUtil.pdf()],
     },(error,response) => {
     //ImagePicker.launchImageLibrary({}, response  => {
      if (response != null) {
        uploadImage(response.uri)
          .then(url => this.setState({ uploadURL: url }))
          .catch(error => console.log(error))
        }
      })
     }

     createDbRef = () => {
       console.log('create masuk');
       const users = firebase.auth().currentUser;
       const uid = users.uid;
       const uemail = users.email;
       const idFile = sessionId;
       const dbRef = firebase.database().ref('users');
       dbRef.child(uid).child('file').child(idFile).set({
         judul: this.state.nama,
         subject: this.state.ket,
         link: this.state.uploadURL,
         status: '0'
       });
       Alert.alert('Berhasil Upload Data')
       this.props.navigation.navigate('Beranda');
     }
     goBack = () => {
       console.log('go back');
       this.props.navigation.navigate('Beranda');
     }
  render() {
    return (
      <Container>
      <View style={styles.contHeader}>
        <TouchableOpacity onPress={this.goBack}>
        <View style={{ marginLeft: 15 }}>

            <Icon name={'ios-arrow-back'} style={{ fontSize: 35, color: '#ffffff' }} />

        </View>
        </TouchableOpacity>
        <View style={{ marginLeft: 20 }}>
          <Text style={styles.textHeader}>
            Print
          </Text>
        </View>
      </View>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Nama File</Label>
              <Input onChangeText={(TextInputValue) => this.setState({ nama: TextInputValue })} />
            </Item>

            <Item floatingLabel>
              <Label>Ket. Singkat</Label>
              <Input onChangeText={(TextInputValue) => this.setState({ ket: TextInputValue })}
              />
            </Item>

          </Form>
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
                      <Text>
                        Upload Here
                      </Text>
                    </View>
                  );
              }
            })()
          }
          <Button full info onPress={() => this._pickImage()}>
          <Label> Choose File </Label>
        </Button>
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
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({

  contHeader: {
    backgroundColor: 'green',
    alignItems: 'center',
    //justifyContent: 'center',
    padding: 12,
    position: 'relative',
    flexDirection: 'row'
  },
  buttonText: {
    color: '#ffffff'
  },
  button: {
    padding: 15
  },

  textHeader: {
    fontSize: 20,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',

  }

});
AppRegistry.registerComponent('AppForm2', () => Print);
