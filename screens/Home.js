// Home.js
import React, {useContext, useState} from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {ScrollView, Text, View, TouchableOpacity, TextInput, StyleSheet, SafeAreaView} from 'react-native';
import {styles} from "../styles/HomeStyles";
import {AuthContext} from "../middleware/AuthContext";
import HistoriqueC from "./HistoriqueC";

import {Feather, Ionicons} from "@expo/vector-icons";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import Carousel from "../component/Carousel.jsx";
import Nouveau from "../component/Nouveautes";
import {useHistoryNavigation} from "../middleware/NavigationHistoryContext";

export default function Home({navigation}) {
    // const navig = useNavigation(); // Assurez-vous que useNavigation est bien importé


    const [searchQuery, setSearchQuery] = useState('');
    const { addRouteToHistory } = useHistoryNavigation();

    useFocusEffect(
        React.useCallback(() => {
            addRouteToHistory('Accueil'); // Replace 'MyScreen' with the actual name of your screen
        }, [])
    );

    const handleSearch = () => {
        // Navigue vers le composant Produits et passe la requête de recherche
        console.log('Recherche pour:', searchQuery);

        navigation.navigate('RechercheProduits', { searchQuery: searchQuery });    };

    return (
        <SafeAreaView style={styles.safeAreaContainer}>

        <ScrollView >
            <Text style={styles.title}>Gourmandise</Text>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Rechercher..."
                    placeholderTextColor="white"
                    value={searchQuery}
                    onChangeText={setSearchQuery} // Met à jour la requête de recherche à chaque changement de texte
                    //onPressIn={()=> {}}
                />
                {/*<TouchableOpacity onPress={() => { console.log('Search icon pressed'); }}>*/}
                {/*    <Feather name="search" size={24} style={styles.searchIcon}/>*/}
                {/*</TouchableOpacity>*/}

                <TouchableOpacity onPress={handleSearch}>
                    <Feather name="search" size={24} style={styles.searchIcon}/>
                </TouchableOpacity>
            </View>
            <View>

                    <Carousel></Carousel>
                    <Nouveau navigation={navigation}> </Nouveau>

            </View>

        </ScrollView>
        </SafeAreaView>

    );
}