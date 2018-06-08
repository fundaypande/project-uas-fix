import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ListView,
  Image
} from 'react-native';
import { Card, CardItem, Body, Icon, } from 'native-base';

type Props = {};
export default class ViewMatkul extends Component<Props> {
  constructor() {
    super();
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds,
      active: 'true'
    };
  }

  componentDidMount() {
    this.getType()
  }

  getType() {
    fetch('http://wadaya.rey1024.com/uasmobile/getMahasiswa.php')
    .then((response) => response.json())
    .then((response) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(response)
        });
    });
  }

  renderRow(os) {
     return (
       <Card>
         <CardItem>
           <Body>
           <View>
             <Image
               source={{ uri: "http://wadaya.rey1024.com/uasmobile/foto/"+ os.pic}}
               style={styles.image}
             />
             <Text>
             Foto
             </Text>
           </View>
              <View style={styles.card}>
               <Icon
                 name={'ios-document'}
                 style={styles.icon}
               />
               <Text style={styles.font}> {os.nim} </Text>
             </View>
             <View style={styles.card}>
              <Icon
                name={'ios-time'}
                style={styles.icon}
              />
              <Text style={styles.font}> {os.name} </Text>
            </View>
            <View style={styles.card}>
             <Icon
               name={'ios-calendar'}
               style={styles.icon}
             />
             <Text style={styles.font}> {os.id_kelas} </Text>
           </View>
           <View style={styles.card}>
            <Icon
              name={'ios-person'}
              style={styles.icon}
            />
            <Text style={styles.font}> {os.gender} </Text>
          </View>

           </Body>
         </CardItem>
       </Card>
     );
  }


  addData = () => {
    this.props.navigation.navigate('AddData');
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1, flexDirection: 'row', alignSelf: 'center', alignItems: 'center'
  },
  icon: {
    flex: 1,
    fontSize: 25,
    color: '#333333',
    marginLeft: 10,
    alignSelf: 'center',
    alignItems: 'center'
  },
  font: {
    flex: 5,
    fontSize: 14
  },
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
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
    width: 100,
    height: 100
  }

});
