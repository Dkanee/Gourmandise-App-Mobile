import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/GlobalStyles";
import { AntDesign, Entypo } from "@expo/vector-icons";

export default function Navbar({ title, navigation, route }) {
    return (

        <View style={styles.containerNav}>
            {route.name !== "Accueil" ? (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
            ) : (
                <View style={{ width: 24 }} /> // Espace réservé pour l'icône, mais invisible
            )}
            <Text style={styles.titleNav}>{title}</Text>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Entypo name="menu" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
}
