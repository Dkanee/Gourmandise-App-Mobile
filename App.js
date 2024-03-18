import React from "react";
import {useFonts} from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {useCallback} from "react";
import { View, Text, StyleSheet } from "react-native";
import LoginScreen from "./screens/LoginScreen.js";
import Createacc from "./screens/Createacc";
import Home from "./screens/Home";
import Navigation from "./component/Navigation";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider, AuthContext } from "./middleware/AuthContext";
import Produits from "./screens/Produits";
import Profil from "./screens/Profil"

export default function App() {
    const[fontsLoaded] = useFonts({
        regular:require("./assets/fonts/Poppins-Regular.ttf"),
        light:require("./assets/fonts/Poppins-Light.ttf"),
        bold:require("./assets/fonts/Poppins-Bold.ttf"),
        medium:require("./assets/fonts/Poppins-Medium.ttf"),
        extrabold:require("./assets/fonts/Poppins-ExtraBold.ttf"),
        semibold:require("./assets/fonts/Poppins-SemiBold.ttf"),
    })

    const onLayoutRootView = useCallback(async()=> {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    },[fontsLoaded]);

    if(!fontsLoaded){
        return null;
    }

  return (
    <AuthProvider>
      <View style={{ flex: 1 }}>
        <Navigation/>
      </View>
    </AuthProvider>
  );
}
