import { StyleSheet, Text, View, TextInput, Button } from "react-native";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        This is a prototype app of Vib without dynamic functionality.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#F0EAFE",
  },
  text: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
