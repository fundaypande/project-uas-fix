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
  TouchableOpacity
 } from 'react-native';
 import { Button, Icon } from 'native-base';

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

  toEdit = () => {
    console.log('go to edit profile');
    this.props.navigation.navigate('EditProfile');
  }

  goBack = () => {
    console.log('go back');
    this.props.navigation.navigate('Beranda');
  }

  deleteUser = () => {
    console.log('do delete user');
    const user = firebase.auth().currentUser;

    user.delete().then(() => {
      console.log('berhasil delete');
      this.props.navigation.navigate('Login');
    }).catch((error) => {
      console.log(error);
    });
  }

  toDelete = () => {
      Alert.alert(
    'Hapus User',
    'Apakah anda yakin ingin menghapus profile anda?',
        [
          { text: 'Hapus', onPress: () => this.deleteUser() },
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        ],
        { cancelable: true }
      );
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
          <View style={{ flexDirection:'row', alignItems: 'center', height: 50, marginTop: 23, flex: 1 }}>
            <TouchableOpacity onPress={this.goBack}>
              <Icon name={'ios-arrow-back'} style={{ fontSize: 35, color: '#ffffff' }} />
            </TouchableOpacity>
            <View style={{marginLeft: 270}}>
            <TouchableOpacity onPress={this.toDelete}>
              <Icon name={'ios-trash-outline'} style={{ justifyContent: 'flex-end', alignItems: 'flex-end', fontSize: 35, color: '#ffffff' }} />
            </TouchableOpacity>
            </View>
          </View>
          <View style={{flex: 8}}>
          <View style={styles.viewHeader}>
            <View>
              <Image
                source={{ uri: this.state.photo }}
                style={styles.image}
              />
            </View>
            <Text style={styles.headerText}>
              { this.state.email }
            </Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.viewBody}>

            <View style={styles.funFloat}>
              <View style={{ marginLeft: 20, marginTop: 10 }}>
                <Icon name={'ios-person'} style={styles.icon} />
              </View>
              <View style={{ marginLeft: 20, marginTop: 15 }}>
                <Text>
                  {this.state.nama}
                </Text>
              </View>
            </View>

            <View style={styles.funFloat}>
              <View style={{ marginLeft: 20, marginTop: 10 }}>
                <Icon name={'ios-card'} style={styles.icon} />
              </View>
              <View style={{ marginLeft: 20, marginTop: 15 }}>
                <Text>
                  {this.state.nik}
                </Text>
              </View>
            </View>


            <View style={styles.funFloat}>
              <View style={{ marginLeft: 20, marginTop: 10 }}>
                <Icon name={'ios-map'} style={styles.icon} />
              </View>
              <View style={{ marginLeft: 20, marginTop: 15 }}>
                <Text>
                  {this.state.alamat}
                </Text>
              </View>
            </View>


            <View style={styles.funFloat}>
              <View style={{ marginLeft: 20, marginTop: 10 }}>
                <Icon name={'ios-phone-portrait'} style={styles.icon} />
              </View>
              <View style={{ marginLeft: 20, marginTop: 15 }}>
                <Text>
                  {this.state.hp}
                </Text>
              </View>
            </View>

          </View>
          </View>
          </ImageBackground>
          <TouchableOpacity onPress={this.toEdit} style={styles.floating}>
            <Icon name={'ios-build'} style={{ fontSize: 30, color: '#ffffff' }} />
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
    height: 120,
    width: 120,
    borderRadius: 60,
    alignItems: 'center',
    alignSelf: 'center'
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
  icon: {
   flex: 1,
   fontSize: 30,
   color: '#34322F',
   marginLeft: 10,
   alignSelf: 'center',
   alignItems: 'center'
 },

});
AppRegistry.registerComponent('AppForm2', () => Login);
