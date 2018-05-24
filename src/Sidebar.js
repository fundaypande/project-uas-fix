import React from 'react';
import { Image, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { Container, Content, Text, List, ListItem } from 'native-base';
import * as firebase from 'firebase';

const routes = ['Beranda'];

export default class Sidebar extends React.Component {

  constructor() {
    super();
    this.state = {
    };
  }

  // componentWillMount() {
  //   // get the current user from firebase
  // }
  //
  logOut = () => {
    firebase.auth().signOut();
    this.props.navigation.navigate('Login');
  }
  toProfile = () => {
    this.props.navigation.navigate('Profile');
  }
  toEdit = () => {
    this.props.navigation.navigate('EditProfile');
  }
  toMaps = () => {
    this.props.navigation.navigate('Maps');
  }

  render() {
    return (
      <Container>
        <Content>
          <ImageBackground
            source={require('../src/Assets/img/bg-profile.png')}
            style={{
              height: 140,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center'
            }} >
            <Image
              square
              style={{ height: 100, width: 100 }}
              source={require('../src/Assets/img/undiksha.png')}
            />
            <Text>  </Text>
          </ImageBackground>
          <List
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data)} >
                  <Text>{data}</Text>
                </ListItem>
              );
            }}
          />
          <TouchableOpacity
            onPress={this.logOut}
            style={{ padding: 10, marginLeft: 10, marginTop: 5 }}
          >
            <Text>Log Out</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.toProfile}
            style={{ padding: 10, marginLeft: 10, marginTop: 5 }}
          >
            <Text>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.toMaps}
            style={{ padding: 10, marginLeft: 10, marginTop: 5 }}
          >
            <Text>Lokasi Kantor</Text>
          </TouchableOpacity>

        </Content>
      </Container>
    );
  }
}
