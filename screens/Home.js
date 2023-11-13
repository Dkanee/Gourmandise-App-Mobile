import React, { Component } from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {GlobalStyles} from "../styles/AppStyles";
import Ionicons from "react-native-vector-icons/Ionicons";
import navigation from "../component/navigation";
import Produits from "./Produits";

    export default function Home({navigation}){
        return(
        <View style={GlobalStyles.containerNav}>
            <TouchableOpacity onPress={()=>navigation.openDrawer()}>
                <Ionicons name="menu-outline" size={22}/>
            </TouchableOpacity>
            <Text style={GlobalStyles.titleNav}>Home</Text>
        </View>
        );
}