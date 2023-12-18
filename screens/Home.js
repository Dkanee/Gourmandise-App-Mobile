// Home.js
import React, {useContext} from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput} from "react-native";
import {styles} from "../styles/HomeStyles";
import {AuthContext} from "../middleware/AuthContext";


export default function Home({navigation}) {

    const {isLoggedIn, setIsLoggedIn, logout} = useContext(AuthContext);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Gourmandise</Text>
            <Text style={styles.subtitle}>Bienvenue | Accueil</Text>
            <View style={styles.rectangle}>
                <Text style={styles.rectangleTitle}>Promotions</Text>
                <Text style={styles.text}>Titre promotion</Text>
                <View style={styles.prices}>
                    <Text style={styles.price}>Prix 1 -></Text>
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
                <TouchableOpacity style={styles.button}>
                    <View style={styles.buttonContent}>
                        <Icon name="shopping-cart" size={20} color="#fff"/>
                        <Text style={styles.buttonText}>Produits</Text>
                    </View>
                </TouchableOpacity>

                {isLoggedIn
                    ?
                    <TouchableOpacity style={styles.button}>
                        <View style={styles.buttonContent}>
                            <Icon name="shopping-cart" size={20} color="#fff"/>
                            <Text style={styles.buttonText}>Compte client</Text>
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

                <TextInput style={styles.searchInput} placeholder="Rechercher"/>
            </View>
            {!isLoggedIn
                ?

                <TouchableOpacity style={styles.bottomButton} onPress={() => {
                    navigation.navigate("Login");
                }}>
                    <View style={styles.buttonContent}>
                        <Icon name="sign-out" size={20} color="#fff"/>
                        <Text style={styles.buttonText}>Connexion</Text>
                    </View>
                </TouchableOpacity>

                :

                <TouchableOpacity style={styles.bottomButton} onPress={() => {
                    logout();
                }}>
                    <View style={styles.buttonContent}>
                        <Icon name="sign-out" size={20} color="#fff"/>
                        <Text style={styles.buttonText}>Déconnexion</Text>
                    </View>
                </TouchableOpacity>
            }

        </ScrollView>
    );
}
