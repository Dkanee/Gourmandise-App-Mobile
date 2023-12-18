// Home.js
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { styles } from "../styles/HomeStyles";


export default function Home({ navigation }) {
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
                        <Icon name="star" size={20} color="#fff" />
                        <Text style={styles.buttonText}>Nouveautés</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <View style={styles.buttonContent}>
                        <Icon name="shopping-cart" size={20} color="#fff" />
                        <Text style={styles.buttonText}>Produits</Text>
                    </View>
                </TouchableOpacity>
                <TextInput style={styles.searchInput} placeholder="Rechercher" />
            </View>
            <TouchableOpacity style={styles.bottomButton} onPress={()=>{
                navigation.navigate('LoginScreen');
            }}>
                <View style={styles.buttonContent}>
                    <Icon name="sign-out" size={20} color="#fff" />
                    <Text style={styles.buttonText}>Connexion</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    );
}
