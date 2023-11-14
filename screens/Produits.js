import React, {Component, useEffect, useState} from 'react';
import {Button, FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {GlobalStyles} from "../styles/AppStyles";
import navigation from "../component/navigation";
import Home from "./Home";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Produits({navigation}) {

    const [data, setData] = useState([]);

    //Fonction pour récup les données de l'API
    const fetchData = async () => {
        try {
            const newData = await fetch(
                "http://94.247.183.122/plesk-site-preview/asalomon.v70208.campus-centre.fr/https/94.247.183.122/api/products",
                {
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            );
            const jsonData = await newData.json();

            //On stock les données dans le async storage
            await AsyncStorage.setItem("data", JSON.stringify(jsonData));

            //Metre a jour l'état de data avec les nouvelles données
            setData(jsonData);
            console.log(data);
        } catch (err) {
            console.error(err);
        }
    }

    const fetchDataLocal = async () => {
        try {
            const storedData = await AsyncStorage.getItem("data");
            if (storedData != null) {
                setData(JSON.parse(storedData));
            }
        } catch (err) {
            console.error(err);
        }
    };

    const displayProducts = () => {
        return data.results.map((produit, index) => {
            <View key={index}>
                {produit.designation}
            </View>
        })
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <View>
            <View style={GlobalStyles.containerNav}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Ionicons name="menu-outline" size={22}/>
                </TouchableOpacity>
                <Text style={GlobalStyles.titleNav}>Produits</Text>
            </View>
            <View>
                <FlatList data={data.results} renderItem={displayProducts}/>
            </View>
        </View>
    )
        ;
}