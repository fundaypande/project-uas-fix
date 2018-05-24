import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert
 } from 'react-native';
 import { Button } from 'native-base';
import * as firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyArt6f03vm_o0aWr8bXum0EcZG1E1P7jcc',
    authDomain: 'uas-project-90970.firebaseapp.com',
    databaseURL: 'https://uas-project-90970.firebaseio.com',
    projectId: 'uas-project-90970',
    storageBucket: 'uas-project-90970.appspot.com',
    messagingSenderId: '29285657528'
};

  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

export default class Login extends Component {


  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      goto: 'Beranda',
    };
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
      this.props.navigation.navigate('Beranda');
      } else {
        Alert.alert('Your not Login');
      }
    });
  }

  loginUser = () => {
    const username = this.state.username;
    const password = this.state.password;
    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(username, password);
    promise.catch(e => {
      if (e) {
        Alert.alert(e.code, e.message);
        console.log(e.message);
      } else {
        this.props.navigation.navigate('Beranda');
      }
    });

    //login seccess
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        this.props.navigation.navigate('Beranda');
      }
    });
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
              Please Sign In With Username and Password
            </Text>
            <TextInput
              underlineColorAndroid="transparent"
              style={myButton('rgba(255,255,255,0.5)')}
              placeholder="Username"
              onChangeText={TextInputValue => this.setState({ username: TextInputValue })}
            />
            <TextInput
              underlineColorAndroid="transparent"
              style={myButton('rgba(255,255,255,0.5)')}
              placeholder="Password"
              onChangeText={TextInputValue => this.setState({ password: TextInputValue })}
              secureTextEntry
            />
            <View style={{ height: 60 }}>
              <Button
                block
                rounded
                style={styles.button}
                onPress={this.loginUser}
              >
                <Text style={styles.buttonText}>Sign In</Text>
              </Button>
            </View>
          </View>
          <View style={styles.viewFooter}>
            <Text style={styles.footerText}>
              Do not have account, please click &nbsp;
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Signup')}
            >
              <Text style={styles.footerText}>
                Sign Up
              </Text>
            </TouchableOpacity>
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

});
AppRegistry.registerComponent('AppForm2', () => Login);
