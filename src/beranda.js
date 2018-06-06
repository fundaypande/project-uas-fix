import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, TextInput, Alert, Image, TouchableOpacity, YellowBox, ListView  } from 'react-native';
import CustomHeader from './CustomHeader.js';

class SecondActivity extends Component {
  constructor(props) {
    super(props);
  }

  navigatePrint = () => {
   this.props.navigation.navigate('Print');

}

  navigateProfil = () => {
   this.props.navigation.navigate('Profile');
  }

  navigateListPrint = () => {
   this.props.navigation.navigate('ListPrint');
  }

  navigateExit = () => {
    firebase.auth().signOut();
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View style = {styles.MainContainer}>
      <CustomHeader
        title="Menu"
        onPress={() => this.props.navigation.toggleDrawer()}
      />
        <View style = {styles.Slider}>
          <Image
           source={require('./Assets/img/index.jpg')}
            style={styles.ImageSlider}
          />
        </View>
        <View style = {styles.BoxKategori}>
          <View style = {styles.BoxKategori2}>
            <View style = {styles.BoxJenis}>
              <TouchableOpacity activeOpacity={0.5} onPress = { this.navigatePrint }>
                <Image
                 source={require('./Assets/img/print.png')}
                 style={styles.ImageStyleJenis}
                />
                <Text style = {styles.TextStyleJenis}> Print </Text>
              </TouchableOpacity>
            </View>
            <View style = {styles.BoxJenis}>
              <TouchableOpacity activeOpacity={0.5} onPress = { this.navigateProfil }>
                <Image
                 source={require('./Assets/img/profil.png')}
                 style={styles.ImageStyleJenis}
                />
              </TouchableOpacity>
              <Text style = {styles.TextStyleJenis}> Profil </Text>
            </View>
          </View>

          <View style = {styles.BoxKategori2}>
            <View style = {styles.BoxJenis}>
              <TouchableOpacity activeOpacity={0.5} onPress = { this.navigateListPrint }>
                <Image
                 source={require('./Assets/img/list.png')}
                 style={styles.ImageStyleJenis}
                />
                <Text style = {styles.TextStyleJenis}> ListPrint </Text>
              </TouchableOpacity>
            </View>
            <View style = {styles.BoxJenis}>
              <TouchableOpacity activeOpacity={0.5} onPress = { this.navigateExit }>
                <Image
                 source={require('./Assets/img/exit.png')}
                 style={styles.ImageStyleJenis}
                />
              </TouchableOpacity>
              <Text style = {styles.TextStyleJenis}> Exit </Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create(
{
  MainContainer:{
  justifyContent: 'center',
  flex:1,
  backgroundColor: '#FFFF8D',
  flexDirection: 'column',
  },

  Slider:{
  justifyContent: 'center',
  flex:1.5,
  backgroundColor: '#414141',
  },

  BoxKategori:{
  justifyContent: 'center',
  flex:3,
  backgroundColor: '#FFFF8D',
  flexDirection: 'row',
  },

  BoxKategori2:{
    justifyContent: 'center',
    alignItems: 'center',
    flex:1,
    backgroundColor: '#FFFF8D',
    margin: 20,
  },

  BoxJenis:{
    justifyContent: 'space-around',
    alignItems: 'center',
    flex:1,
    backgroundColor: '#FFFFFF',
    margin: 5,
    flexDirection: 'column',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 5,
  },

  ImageSlider: {
     width: 400,
     height: 200,
     marginLeft: 5,
     marginRight: 5,
     resizeMode : 'stretch',
     justifyContent: 'center',
     alignItems: 'center'
  },

  ImageStyleJenis: {
     padding: 10,
     marginLeft: 5,
     marginRight: 5,
     marginBottom: 5,
     marginTop: 10,
     width: 116,
     height: 116,
     resizeMode : 'stretch',
     justifyContent: 'center',
     alignItems:'center',
  },

  TextStyleJenis:{
    marginBottom : 4,
    fontSize: 20,
    color: '#000000',
    alignItems:'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight:'bold',
  },

});

export default SecondActivity;
