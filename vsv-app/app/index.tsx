import React, { useState } from 'react';
import MapView from 'react-native-maps';
import * as Native_Map from 'react-native-maps';
import { Alert, Button, Text, StyleSheet, View } from 'react-native';
import * as Location from 'expo-location';
import {APIProvider, Map} from '@vis.gl/react-google-maps';


export default function App() {
  // const api = process.env.EXPO_PUBLIC_API
  async function onpress() {
    console.log("started")
    await Location.requestForegroundPermissionsAsync()
    console.log(Location.PermissionStatus)
    let location = await Location.getCurrentPositionAsync({});
    let address = await Location.reverseGeocodeAsync(location.coords);
    console.log(address);

  }
  return (
    // <View style={styles.container}>
    //   <Text>fe</Text>
    //   <Button onPress={onpress} title={"test"}/>;
    //   <MapView showsUserLocation={true} provider={Native_Map.PROVIDER_GOOGLE} style={styles.map}/>
      <APIProvider apiKey={"AIzaSyAykSwMb92Ro1FKcBHZroNNETAOx7ZwYuQ"}>
        <Map 
        defaultCenter={{lat:20,lng:10}}
        defaultZoom={3}/>
      </APIProvider>
    // {/* </View> */}
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '25%',
  },
});

