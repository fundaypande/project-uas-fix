import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import * as firebase from 'firebase';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class home extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      photo: '',
      nama: ''
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
        console.log(profile, namaku);
        this.setState({ nama: namaku, photo: profile });
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
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
                    style={styles.image}
                  />
                </View>
              );
          }
        })()
      }
        <Text style={styles.welcome}>
          Welcome to React Native! Costumize
        </Text>
        <Text style={styles.instructions}>
          { this.state.nama }
        </Text>
        <Text>
          Hello My World
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.toggleDrawer()}
          style={{ padding: 10, marginLeft: 10, marginTop: 5, backgroundColor: '#000000' }}
        >
          <Text style={{ color: '#ffffff' }}>Open Menu</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
    resizeMode: 'contain',
  },
});
