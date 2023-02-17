import React, { useState, useEffect } from "react";
import MapView, { Polyline } from "react-native-maps";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { decode } from "@mapbox/polyline";
import * as Location from "expo-location";

const MapScreen = () => {
  // when app start, current location saved automatically in "location"
  const [location, setLocation] = useState();
  const [address, setAddress] = useState();
  const [destination, setDestination] = useState();
  const [coords, setCoords] = useState([]);
  useEffect(() => {
    getDirections("49.2827, -123.1207", "49.284605, -123.124824")
      .then((coords) => setCoords(coords))
      .catch((err) => console.log("Something Went Wrong"));
  }, []);
  let curr_latitude;
  let curr_longitude;
  let dest_latitude;
  let dest_longitude;
  const robson = {
    latitude: 49.284605,
    longitude: -123.124824,
  };
  // once "Start Journey" button pressed, destination coordinate saved in destination_coord
  const [destination_coord, setDestination_coord] = useState(false);

  useEffect(() => {
    const getPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.log("Please grant location permission");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        // latitude: currentLocation.coords.latitude,
        // longitude: currentLocation.coords.longitude,
        latitude: "49.2827",
        longitude: "-123.1207",
        latitudeDelta: "0.15",
        longitudeDelta: "0.15",
      });
      curr_latitude = currentLocation.coords.latitude;
      curr_longitude = currentLocation.coords.longitude;
    };
    getPermission();
  }, []);

  const geocode = async () => {
    const geocodedLocation = await Location.geocodeAsync(address);

    setDestination_coord({
      latitude: geocodedLocation[0].latitude,
      longitude: geocodedLocation[0].longitude,
    });
    dest_latitude = geocodedLocation[0].latitude;
    dest_longitude = geocodedLocation[0].longitude;
    console.log(dest_latitude, dest_longitude);
  };
  `49.284605, -123.124824`;
  const getDirections = async (startLoc, destinationLoc) => {
    try {
      const KEY = "REMOVED FOR GITHUB";
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
  useEffect(() => {
    getDirections(`49.2827, -123.1207`, `49.284605, -123.124824`)
      .then((coords) => setCoords(coords))
      .catch((err) => console.log("Something went wrong."));
  }, []);
  const initRegion = {
    latitude: 49.2827,
    longitude: -123.1207,
    latitudeDelta: 0.1022,
    longitudeDelta: 0.1021,
  };
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
          style={styles.address_search}
        />
        <View style={styles.buttons}>
          <Button title="Enter Address" onPress={geocode} />
          {/* later, put onPress for placing marks and starting navigation */}
          <Button title="Start Your Journey" />
        </View>
      </View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation={true}
        // initialRegion={location}
        initialRegion={{
          latitude: 49.2827,
          longitude: -123.1207,
          latitudeDelta: 0.0222,
          longitudeDelta: 0.0221,
        }}
      >
        <Marker coordinate={location} pinColor="#5D3EA8" />
        <Marker coordinate={robson} />
        {coords.length > 0 && (
          <Polyline
            strokeWidth={3}
            strokeColor={"#5D3EA8"}
            coordinates={coords}
            lineDashPattern={[1]}
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
    backgroundColor: "#F0EAFE",
  },
  search: {
    marginBottom: "auto",
    paddingTop: "3%",
  },
  address_search: {
    borderWidth: "1",
    backgroundColor: "white",
    paddingVertical: "1%",
    paddingHorizontal: "10%",
    maxWidth: "85%",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  map: {
    width: "100%",
    height: "85%",
    marginTop: "auto",
  },
});

export default MapScreen;
