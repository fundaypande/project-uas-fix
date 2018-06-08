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
import styles from './style.js';
import { Icon } from 'native-base';

let admin = '';

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
          <Icon name="ios-trash" />
        </TouchableHighlight>
        {/*Icon taken from google's material icon pack: https://design.google.com/icons/#ic_done*/}
      </View>
    );
  }
}

module.exports = ListItem;
