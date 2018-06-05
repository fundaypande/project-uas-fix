import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  ListView,
  ToolbarAndroid
} from 'react-native';
import * as firebase from 'firebase';
import ListItem from './ListItem.js';
import styles from './style.js'

export default class ListPrint extends Component {

  constructor(props) {
    super(props);
    const users = firebase.auth().currentUser;
    const uid = users.uid;
    this.tasksRef = firebase.database().ref('users/' + uid + '/file');
    // Each list must has a dataSource, to set that data for it you must call: cloneWithRows()
    // Check out the docs on the React Native List View here:
    // https://facebook.github.io/react-native/docs/listview.html
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource: dataSource, // dataSource for our list
      newTask: '' // The name of the new task
    };
  }

  componentDidMount() {
    // start listening for firebase updates
    this.listenForTasks(this.tasksRef);
  }

  render() {
    return (
      <View style={styles.container}>
  			<ToolbarAndroid
          style={styles.navbar}
          title="Todo List" />
        {/*A list view with our dataSource and a method to render each row*/}
        {/*Allows lists to be empty, can be removed in future versions of react*/}
        <ListView
          dataSource={this.state.dataSource}
          enableEmptySections={true}
          renderRow={this._renderItem.bind(this)}
          style={styles.listView}/>
      </View>
    );
  }

  _renderItem(task) {
    // a method for building each list item
    const onTaskCompletion = () => {
      // removes the item from the list
      this.tasksRef.child(task._key).remove()
    };
    return (
      <ListItem task={task} onTaskCompletion={onTaskCompletion} />
    );
  }

  listenForTasks(tasksRef) {
    // listen for changes to the tasks reference, when it updates we'll get a
    // dataSnapshot from firebase
    tasksRef.on('value', (dataSnapshot) => {
      // transform the children to an array
      var tasks = [];
      dataSnapshot.forEach((child) => {
        tasks.push({
          name: child.val(),
          kunci: child.key,
          _key: child.key
        });
      });

      // Update the state with the new tasks
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(tasks)
      });
    });
  }
}
