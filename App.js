import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CreateAcc from "./screens/Createacc.js"; // Importez le composant LoginScreen

export default function App() {
  return (
    <View style={styles.container}>
      <CreateAcc />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
