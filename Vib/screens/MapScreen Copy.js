import React, { useState, useEffect } from "react";
import MapView, { Polyline } from "react-native-maps";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { decode } from "@mapbox/polyline";
import * as Location from "expo-location";

// Google Directions API
const getDirections = async (startLoc, destinationLoc) => {
  try {
    const KEY = "AIzaSyA1NA3CVqNv99ndEVYiLLhG7eBDzGaNKKs";
    let resp = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${KEY}`
    );
    let respJson = await resp.json();
    let points = decode(respJson.routes[0].overview_polyline.points);
    let coords = points.map((point, index) => {
      return {
        latitude: point[0],
        longitude: point[1],
      };
    });
    return coords;
  } catch (error) {
    return error;
  }
};

const MapScreen = () => {
  const [coords, setCoords] = useState([]);
  useEffect(() => {
    getDirections(
      `${curr_latitude}, ${curr_longitude}`,
      `${dest_latitude}, ${dest_longitude}`
    )
      // getDirections("49.2827, -123.1207", "49.2727, -123.1207")
      .then((coords) => setCoords(coords))
      .catch((err) => console.log("Something went wrong."));
  }, []);
  const [location, setLocation] = useState();
  const [address, setAddress] = useState();
  const [curr_coord, setCurr_coord] = useState();
  const [destination, getDest_coord] = useState();

  let curr_latitude;
  let curr_longitude;
  let dest_latitude;
  let dest_longitude;

  useEffect(() => {
    const getPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.log("Please grant location permission");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      // got the current latitude and longitude
      curr_latitude = currentLocation.coords.latitude;
      curr_longitude = currentLocation.coords.longitude;
      //

      setCurr_coord({
        latitude: { curr_latitude },
        longitude: { curr_longitude },
      });
    };
    getPermission();
  }, []);

  // getting user location
  const start = {
    // change this later
    // latitude: curr_latitude,
    // longitude: curr_longitude,
    // I temporarily put Vancouver coordinates
    latitude: 49.2827,
    longitude: -123.1207,
  };

  // setting initial view for map
  const initRegion = {
    // change this later
    // latitude: curr_latitude,
    // longitude: curr_longitude,
    // I temporarily put Vancouver coordinates
    latitude: 49.2827,
    longitude: -123.1207,
    latitudeDelta: 0.1522,
    longitudeDelta: 0.1521,
  };

  const geocode = async () => {
    const geocodedLocation = await Location.geocodeAsync(address);

    //got the destination latitude and longitude
    dest_latitude = geocodedLocation[0].latitude;
    dest_longitude = geocodedLocation[0].longitude;

    console.log(dest_latitude, dest_longitude);
  };

  async function getDestination() {
    const geocodedLocation = await Location.geocodeAsync(address);

    //got the destination latitude and longitude
    // dest_latitude = geocodedLocation[0].latitude;
    // dest_longitude = geocodedLocation[0].longitude;
    getDest_coord([
      geocodedLocation[0].latitude,
      geocodedLocation[0].longitude,
    ]);
    console.log(destination);
    return { latitude: dest_latitude, longitude: dest_longitude };
  }

  // START FROM HERE --> SOMEHOW GET THE DESTINATION TO GET THE MARKER
  // console.log(getDestination());

  // need to get destination coords
  // const destination = {
  //   latitude: dest_latitude,
  //   longitude: dest_longitude,
  // };
  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput
          placeholder="Your journey ends in..."
          value={address}
          onChangeText={setAddress}
          placeholderTextColor={"#5D3EA8"}
          selectionColor="#5D3EA8"
          spellCheck="true"
        />
        <Button title="Start Journey" onPress={geocode} />
        <Button title="Start Map" onPress={getDestination} />
      </View>
      <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        initialRegion={initRegion}
        style={styles.map}
      >
        <Marker coordinate={start} pinColor="red" />
        {destination && (
          <Marker coordinate={getDestination} pinColor="#5D3EA8" />
        )}
        {coords.length > 0 && (
          <Polyline
            strokeWidth={3}
            strokeColor={"#5D3EA8"}
            coordinates={coords}
          />
        )}
      </MapView>
    </View>
  );
};

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "85%",
    marginTop: "auto",
  },
  search: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "auto",
  },
});

export default MapScreen;
