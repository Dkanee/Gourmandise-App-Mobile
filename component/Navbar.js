import React, {Component, useContext} from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/GlobalStyles";
import { AntDesign, Entypo } from "@expo/vector-icons";
import {AuthContext} from "../middleware/AuthContext";
import { useHistoryNavigation } from '../middleware/NavigationHistoryContext'; // Importez le hook personnalisé

export default function Navbar({ title, navigation, route }) {
    const { isLoggedIn, logout } = useContext(AuthContext);
    const { getPreviousRoute } = useHistoryNavigation(); // Utilisez le hook pour accéder aux fonctions du contexte

    const handleGoBack = () => {
        const previousRoute = getPreviousRoute();
        if (previousRoute) {
            navigation.navigate(previousRoute);
        } else {
            navigation.goBack();
        }
    };

    return (

        <View style={styles.containerNav}>
            {/* Afficher l'icône utilisateur uniquement si l'utilisateur n'est pas connecté et si nous sommes sur l'écran "Accueil" */}
            {!isLoggedIn && route.name === "Accueil" ? (
                <TouchableOpacity onPress={() => navigation.navigate("Se connecter")}>
                    <Entypo name="user" size={24} color="white" />
                </TouchableOpacity>
            ) : (
                // Si l'utilisateur est connecté ou si nous ne sommes pas sur l'écran "Accueil", afficher un espace vide de la même taille pour maintenir le layout
                <View style={{ width: 0 }} />
            )}

            {/* Condition pour afficher l'icône de retour, sauf sur l'écran "Accueil" */}
            {route.name !== "Accueil" && route.name !== "Profil" && route.name !== "Détails de la commande" && route.name !== "Historique des commandes" ? (
                <TouchableOpacity onPress={handleGoBack}>
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
            ) : (
                // Si nous sommes sur l'écran "Accueil", afficher un espace vide pour maintenir le layout
                <View style={{ width: 0 }} />
            )}

            {isLoggedIn && route.name === "Profil" ? (
                <TouchableOpacity onPress={() => navigation.navigate("Accueil")}>
                    <Entypo name="home" size={24} color="white" />
                </TouchableOpacity>
            ) : (
                // Si l'utilisateur est connecté ou si nous ne sommes pas sur l'écran "Accueil", afficher un espace vide de la même taille pour maintenir le layout
                <View style={{ width: 0 }} />
            )}

            {isLoggedIn && route.name === "Historique des commandes" ? (
                <TouchableOpacity onPress={() => navigation.navigate("Profil")}>
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
            ) : (
                // Si l'utilisateur est connecté ou si nous ne sommes pas sur l'écran "Accueil", afficher un espace vide de la même taille pour maintenir le layout
                <View style={{ width: 24 }} />
            )}

            {isLoggedIn && route.name === "Détails de la commande" ? (
                <TouchableOpacity onPress={() => navigation.navigate("Historique des commandes")}>
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
            ) : (
                // Si l'utilisateur est connecté ou si nous ne sommes pas sur l'écran "Accueil", afficher un espace vide de la même taille pour maintenir le layout
                <View style={{ width: 24 }} />
            )}


            {/* Titre de la navigation */}
            <Text style={styles.titleNav}>{title}</Text>

            {/* Bouton pour ouvrir le menu drawer */}
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Entypo name="menu" size={24} color="white" />
            </TouchableOpacity>
        </View>

    );
}
