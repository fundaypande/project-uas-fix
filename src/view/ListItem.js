import React, {
  Component
} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  Linking,
  Alert
} from 'react-native';
import * as firebase from 'firebase';
import styles from './style.js'

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      judul: '',
      subject: '',
      status: '',
      link: '',
    };
  }

  componentWillMount() {
    const users = firebase.auth().currentUser;
    const uid = users.uid;
    const starCountRef = firebase.database().ref('users/' + uid + '/file/' + this.props.task.kunci);
    starCountRef.on('value', (snapshot) => {
      const userObj = snapshot.val();
      if (userObj != null) {
        const judulku = userObj.judul;
        const subjectku = userObj.subject;
        const statusku = userObj.status;
        const linku = userObj.link;
        this.setState({
          judul: judulku,
          subject: subjectku,
          status: statusku,
          link: linku,
        });
      }
    });
  }

  alertInfo() {

  }

  render() {
    // We are going to return a simple list item with just a title for now
    return (
      <View style={styles.listItem}>

        <Text
          style={styles.listItemTitle}
          onPress={() =>
            Alert.alert(
              this.state.judul + ' ' + this.state.status ,
              this.state.subject,
              [
                {text: 'Download', onPress: () => Linking.openURL(this.state.link)},
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              ],
              { cancelable: true }
            )
          }
        >
          {this.props.task.kunci}
        </Text>
        <TouchableHighlight onPress={this.props.onTaskCompletion}>
          <Image style={styles.listItemAction} source={{uri: 'https://1.bp.blogspot.com/-uRaHoFqqsxY/V70he-ZYRlI/AAAAAAAAA7A/S4Js-D6sMR8vs28NFv7W39rFRAPX7XIWgCLcB/s1600/ic_done_black_24dp.png'}} />
        </TouchableHighlight>
        {/*Icon taken from google's material icon pack: https://design.google.com/icons/#ic_done*/}
      </View>
    );
  }
}

module.exports = ListItem;
