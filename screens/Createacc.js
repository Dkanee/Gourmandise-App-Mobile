import React, { useState } from "react";
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    Modal,
    StyleSheet,
    Button,
    Alert,
} from "react-native";
import { styles } from "../styles/AppStyles";

export default function Createacc({ navigation }) {
    const [nom, setNom] = useState(""); // État pour le nom
    const [adresse, setAdresse] = useState(""); // État pour l'adresse
    const [cp, setCp] = useState(""); // État pour le code postal
    const [ville, setVille] = useState(""); // État pour la ville
    const [telephone, setTelephone] = useState(""); // État pour le téléphone
    const [email, setEmail] = useState(""); // État pour l'email
    const [motdepasse, setPassword] = useState(""); // État pour le mot de passe
    const [modalVisible, setModalVisible] = useState(false); // État pour la visibilité de la modale

    const createAccount = async () => {
        // Vérification que tous les champs sont remplis
        if (!nom || !adresse || !cp || !ville || !telephone || !email || !motdepasse) {
            Alert.alert("Erreur", "Veuillez remplir tous les champs.");
            return;
        }

        try {
            const response = await fetch(
                "https://gourmandise.mgueye-ba.v70208.campus-centre.fr/api/register",
                {
                    method: "POST",
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nom,
                        adresse,
                        cp,
                        ville,
                        telephone,
                        email,
                        motdepasse,
                    }),
                }
            );

            if (response.status === 201) {
                setModalVisible(true);
                setTimeout(() => {
                    setModalVisible(false);
                    navigation.navigate('Login');
                }, 2000);
            } else {
                // Logique pour gérer les réponses HTTP autres que 201
                Alert.alert("Erreur", "Échec de la création de compte.");
            }
        } catch (error) {
            // Logique pour gérer les erreurs de la requête fetch
            Alert.alert("Erreur", "Une erreur est survenue lors de la création du compte.");
        }
    };

    return (

        <SafeAreaView style={styles.container}>
            <Image source={{ uri: "https://i.ibb.co/Q9Pjm80/logo.png" }} style={styles.logo1} />

            <Text style={[styles.label, { color: "black" }]}>Nom:</Text>
            <TextInput style={styles.input} value={nom} onChangeText={setNom} placeholder="Entrez votre nom" placeholderTextColor="white" />

            <Text style={[styles.label, { color: "black" }]}>Adresse:</Text>
            <TextInput style={styles.input} value={adresse} onChangeText={setAdresse} placeholder="Entrez votre adresse" placeholderTextColor="white" />

            <Text style={[styles.label, { color: "black" }]}>Code Postal:</Text>
            <TextInput style={styles.input} keyboardType={"number-pad"} value={cp} onChangeText={setCp} placeholder="Entrez votre code postal" placeholderTextColor="white" />

            <Text style={[styles.label, { color: "black" }]}>Ville:</Text>
            <TextInput style={styles.input} value={ville} onChangeText={setVille} placeholder="Entrez votre ville" placeholderTextColor="white" />

            <Text style={[styles.label, { color: "black" }]}>Téléphone:</Text>
            <TextInput style={styles.input} keyboardType={"phone-pad"} value={telephone} onChangeText={setTelephone} placeholder="Entrez votre n° de téléphone" placeholderTextColor="white" />

            <Text style={[styles.label, { color: "black" }]}>Email:</Text>
            <TextInput style={styles.input} keyboardType={"email-address"} value={email} onChangeText={setEmail} placeholder="Entrez votre email" placeholderTextColor="white" />

            <Text style={[styles.label, { color: "black" }]}>Mot de passe:</Text>
            <TextInput style={styles.input} value={motdepasse} onChangeText={setPassword} placeholder="Entrez votre mot de passe" secureTextEntry placeholderTextColor="white" />


            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={{ color: '#007AFF', textDecorationLine: 'underline', marginTop: 10, marginBottom: 20 }}>
                    Vous avez déjà un compte ?
                </Text>
            </TouchableOpacity>

            <Button title="Créer compte" onPress={createAccount} color="#7B3F00" />

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={localStyles.centeredView}>
                    <View style={localStyles.modalView}>
                        <Text style={localStyles.modalText}>Compte créé avec succès !</Text>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

// Styles pour la modale, intégrés directement pour éviter les crsmts°
const localStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
});
