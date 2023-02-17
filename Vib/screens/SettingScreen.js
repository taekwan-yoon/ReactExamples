import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Button,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Slider from "@react-native-community/slider";

const SettingScreen = () => {
  const [range, setRange] = useState(0);
  const Separator = () => <View style={styles.separator} />;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Button
          title="Profile"
          onPress={() => Alert.alert("Under Construction")}
        />
        <Separator />
        <Button
          title="Connect to SmartPhone"
          onPress={() => Alert.alert("Under Construction")}
        />
        <Separator />
        <Button
          title="Vibration Intensity"
          onPress={() => Alert.alert("Under Construction")}
        />
        <Text style={styles.text}>{Math.floor(range * 1)}</Text>
        <Slider
          style={{ width: 300, height: 50 }}
          onValueChange={(value) => setRange(value)}
          minimumValue={0}
          maximumValue={10}
        />
        <Separator />
        <Button
          title="Vibration Pattern"
          onPress={() => Alert.alert("Under Construction")}
        />
        <Separator />
        <Button
          title="LED Pattern"
          onPress={() => Alert.alert("Under Construction")}
        />
        <Separator />

        <Button
          title="Battery Status"
          onPress={() => Alert.alert("Under Construction")}
        />
        <Separator />
        <Button
          title="Customer Service"
          onPress={() => Alert.alert("Under Construction")}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0EAFE",
  },
  scrollView: {
    marginHorizontal: 10,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "white",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default SettingScreen;
