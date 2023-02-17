import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import Geocoder from "react-native-geocoding";

const MapComponent = () => {
  // initialization for reverse geocoding
  Geocoder.init("REMOVED FOR GITHUB", { language: "en" }); // set the language

  // style of map
  const containerStyle = {
    width: "70%",
    height: "600px",
  };

  // the initial view/center of the map
  const initial_view = {
    lat: 53.5461,
    lng: -113.4937,
  };

  //   // lat = 53.5461;
  //   // lng = -113.4937;

  //   await Geocoder.from(lat, lng)
  //     .then((json) => {
  //       var addressComponent =
  //         json.results[0].address_components[4]["long_name"];
  //       console.log(addressComponent);
  //     })
  //     .catch((error) => console.warn(error));
  // };
  const [[lat, lng], setLatLng] = useState(["", ""]);

  const getLatLng = (event) => {
    let lat = event.latLng.lat();
    let lng = event.latLng.lng();
    setLatLng([lat, lng]);
    console.log(lat, lng);
  };

  useEffect(() => {
    Geocoder.from(lat, lng)
      .then((json) => {
        let addressComponent = json.results[0].address_components;
        console.log(addressComponent);
      })
      .catch((error) => console.warn(error));
  }, [lat, lng]);

  return (
    // taekwan's google api key
    <LoadScript googleMapsApiKey="REMOVED FOR GITHUB">
      {/* // google map component */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={initial_view}
        zoom={2}
        onClick={(event) => getLatLng(event)}
      ></GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
