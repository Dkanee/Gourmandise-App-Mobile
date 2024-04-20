// Home.js
import React, {useContext, useState} from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { ScrollView, Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import {styles} from "../styles/HomeStyles";
import {AuthContext} from "../middleware/AuthContext";
import HistoriqueC from "./HistoriqueC";
import {SearchBar} from "react-native-screens";

import {Feather, Ionicons} from "@expo/vector-icons";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import Carousel from "../component/Carousel.jsx";
import Nouveau from "../component/Nouveautes";
import {useHistoryNavigation} from "../middleware/NavigationHistoryContext";

export default function Home({navigation}) {
    // const navig = useNavigation(); // Assurez-vous que useNavigation est bien importé


    const {isLoggedIn, setIsLoggedIn, logout} = useContext(AuthContext);
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
        <ScrollView contentContainerStyle={styles.container}>
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
                <ScrollView>
                    <Carousel></Carousel>
                    <Nouveau navigation={navigation}> </Nouveau>
                </ScrollView>
            </View>



            <View style={styles.rectangle}>
                <Text style={styles.rectangleTitle}>Promotions</Text>
                <Text style={styles.text}>Titre promotion</Text>
                <View style={styles.prices}>
                    <Text style={styles.price}>Prix 1 </Text>
                    <Text style={styles.price}>Prix 2</Text>
                </View>
            </View>
            <View style={styles.centeredRectangle}>
                <TouchableOpacity style={styles.button}>
                    <View style={styles.buttonContent}>
                        <Icon name="star" size={20} color="#fff"/>
                        <Text style={styles.buttonText}>Nouveautés</Text>
                    </View>
                </TouchableOpacity>
                {/*<TouchableOpacity style={styles.button} onPress={() => {*/}
                {/*    navigation.navigate("Produits");*/}
                {/*}}>*/}
                    <View style={styles.buttonContent}>
                        <Icon name="shopping-cart" size={20} color="#fff"/>
                        <Text style={styles.buttonText}>Produits</Text>
                    </View>
                {/*//</TouchableOpacity>*/}

                {isLoggedIn
                    ?
                    <TouchableOpacity style={styles.button} onPress={() => {
                        navigation.navigate("HistoriqueC");
                    }}>
                        <View style={styles.buttonContent}>
                            <Icon name="shopping-cart" size={20} color="#fff"/>
                            <Text style={styles.buttonText}>Historique commande</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    <View></View>
                }
                {isLoggedIn
                    ?
                    <TouchableOpacity style={styles.button}>
                        <View style={styles.buttonContent}>
                            <Icon name="shopping-cart" size={20} color="#fff"/>
                            <Text style={styles.buttonText}>Panier</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    <View></View>
                }

            </View>

        </ScrollView>
    );
}