import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";

export default function Map({ navigation }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const confirmHandler = () => {
    navigation.navigate("Profile", { selectedLocation });
  };
  return (
    <>
      <MapView
        onPress={(e) => {
          setSelectedLocation({
            longitude: e.nativeEvent.coordinate.longitude,
            latitude: e.nativeEvent.coordinate.latitude,
          });
        }}
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {selectedLocation && <Marker coordinate={selectedLocation} />}
      </MapView>

      <Button
        disabled={!selectedLocation}
        title="confirm selected location"
        onPress={confirmHandler}
      ></Button>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
