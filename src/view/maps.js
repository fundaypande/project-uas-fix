import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { Icon } from 'native-base';

export default class App extends Component {

  state = {
    region: {
      latitude: -8.149407,
      longitude: 115.216667,
      latitudeDelta: 0.8922,
      longitudeDelta: 0.8421,
    },
    markers: [
      {
        key: 5,
        latlng: {
          latitude: -8.083789,
          longitude: 115.173065
        },
        title: 'Lokasi Kantor Kami',
        subtitle: 'berlokasi di jalan gunung batur no.8 kubutambahan'
      },
   ]
  };

  goBack = () => {
    console.log('go back');
    this.props.navigation.navigate('Beranda');
  }

  render() {
    return (
      <View style={styles.contMain}>
        <View style={styles.contHeader}>
          <TouchableOpacity onPress={this.goBack}>
          <View style={{ marginLeft: 15 }}>

              <Icon name={'ios-arrow-back'} style={{ fontSize: 35, color: '#ffffff' }} />

          </View>
          </TouchableOpacity>
          <View style={{ marginLeft: 20 }}>
            <Text style={styles.textHeader}>
              Lokasi Kantor
            </Text>
          </View>
        </View>
        <View style={styles.contMaps}>
              <MapView
                style={styles.map}
                region={this.state.region}
              >
              {this.state.markers.map(mark => (
              <Marker
                  key={mark.key}
                  coordinate={mark.latlng}
                  title={mark.title}
                  description={mark.subtitle}
                />
              ))}
              </MapView>
        </View>
        <View style={styles.contFooter}>
           <Text style={styles.textFooter}> @2018 </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  contMain: {
      flex: 1
  },
  contHeader: {
    backgroundColor: 'green',
    alignItems: 'center',
    //justifyContent: 'center',
    flex: 1,
    position: 'relative',
    flexDirection: 'row'
  },
  contMaps: {
    flex: 10
  },
  textHeader: {
    fontSize: 20,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',

  },
  contFooter: {
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    position: 'relative'
  },
  textFooter: {
    fontSize: 16,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  }

});
