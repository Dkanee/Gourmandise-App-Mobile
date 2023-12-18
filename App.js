import React from "react";
import {View, Text, StyleSheet} from "react-native";
import LoginScreen from "./screens/LoginScreen.js";
import Createacc from "./screens/Createacc";
import Home from "./screens/Home";
import Navigation from "./component/Navigation";
import {NavigationContainer} from "@react-navigation/native";
import {AuthProvider, AuthContext} from "./middleware/AuthContext";

export default function App() {
    return (
        <AuthProvider>
            <View style={{flex: 1}}>
                <Navigation/>
            </View>
        </AuthProvider>
    );
}

