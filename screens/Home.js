import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/GlobalStyles";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Home({ navigation }) {
  return (
    <View style={styles.containerNav}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu-outline" size={22} />
      </TouchableOpacity>
      <Text style={styles.titleNav}>Home</Text>
    </View>
  );
}
