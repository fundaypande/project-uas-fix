import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
export default class App extends Component {

  state = {
    region: {
      latitude: -8.149407,
      longitude: 115.216667,
      latitudeDelta: 0.8922,
      longitudeDelta: 0.8421,
    },
    markers : [
      {
        key:1,
        latlng: {
          latitude:-8.1550617,
          longitude: 115.0644899
        },
        title: 'Museum Buleleng',
        subtitle: 'berlokasi di Jl Veteran no 23 singaraja Bali'
      },
      {
        key:2,
        latlng: {
          latitude:-8.4629415,
          longitude: 115.1976722
        },
        title: 'Museum Bali',
        subtitle: 'museum penyimpanan peningggalan masa lampau manusia dan etnografi'
      },
      {
        key:3,
        latlng: {
          latitude:-8.5240722,
          longitude: 115.2619445
        },
        title: 'Museum Puri Lukisan'
      }
      ,
      {
        key:4,
        latlng: {
          latitude:-8.6206825,
          longitude: 115.1735166
        },
        title: 'Museum Le Mayeur'
      },
      {
        key: 5,
        latlng: {
          latitude: -8.083789,
          longitude: 115.173065
        },
        title: 'Rumah Saya : Komang Sudana Yasa Pande (1515051068)',
        subtitle: 'berlokasi di jalan gunung batur no.8 kubutambahan'
      },
   ]
  };

  render() {
    return (
      <View style={styles.contMain}>
        <View style={styles.contHeader}>
            <Text style={styles.textHeader}>
              Peta Museum di Bali
            </Text>
        </View>
        <View style={styles.contMaps}>
              <MapView
                style={styles.map}
                region={this.state.region}
              >
              {this.state.markers.map(mark => (
              <Marker
                  key = {mark.key}
                  coordinate={mark.latlng}
                  title={mark.title}
                  description={mark.subtitle}
                />
              ))}
              </MapView>
        </View>
        <View style={styles.contFooter}>
           <Text style={styles.textFooter}> http://www.rey1024.com </Text>
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
      flex : 1
  },
  contHeader: {
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    position: 'relative'
  },
  contMaps : {
    flex : 10
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
