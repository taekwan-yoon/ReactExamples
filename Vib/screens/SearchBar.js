import * as React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { useState, useEffect } from "react";
import * as Location from "expo-location";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const SearchBar = () => {
  const [location, setLocation] = useState();
  const [address, setAddress] = useState();
  const [curr_coord, setCurr_coord] = useState();
  const [dest_coord, setDest_coord] = useState();

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

  const geocode = async () => {
    const geocodedLocation = await Location.geocodeAsync(address);

    //got the destination latitude and longitude
    dest_latitude = geocodedLocation[0].latitude;
    dest_longitude = geocodedLocation[0].longitude;
    //
    setDest_coord({
      latitude: { dest_latitude },
      longitude: { dest_longitude },
    });
    console.log(curr_coord, dest_coord);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Your journey ends in..."
        value={address}
        onChangeText={setAddress}
        dataDetectorTypes={"address"}
        contextMenuHidden="true"
        placeholderTextColor={"#5D3EA8"}
        selectionColor="#5D3EA8"
        spellCheck="true"
      />
      <Button title="Enter the address" onPress={geocode} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "auto",
  },
});

export default SearchBar;
