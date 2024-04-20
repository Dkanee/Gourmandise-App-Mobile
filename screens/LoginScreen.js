import React, { useState, useContext } from "react";
import {
    View,
    Text,
    TextInput,
    Image,
    ImageBackground,
    Dimensions, TouchableOpacity, Modal,
} from "react-native";
import { Button } from "react-native-elements";
import { styles } from "../styles/AppStyles";
import { localStyles} from "../styles/localStyles";

import { AuthContext } from "../middleware/AuthContext";
import Toast from "react-native-toast-message";
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Entypo} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useHistoryNavigation} from "../middleware/NavigationHistoryContext";




const { width, height } = Dimensions.get("window"); // Obtenirr les dimensions de l'écran

export default function LoginScreen({ title }) {
    const navigation=useNavigation();
  const [email, setEmail] = useState("");
  const [motdepasse, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const [passwordVisible, setPasswordVisible] = useState(false);
    const [focusedField, setFocusedField] = useState(null);
    const [emailError, setEmailError] = useState(""); // Ajouté pour gérer les erreurs d'email
    const [passwordError, setPasswordError] = useState(""); // Nouvel état pour les erreurs de mot de passe
    const [modalVisible, setModalVisible] = useState(false); // État pour la visibilité de la modale
    const { addRouteToHistory } = useHistoryNavigation();

    useFocusEffect(
        React.useCallback(() => {
            addRouteToHistory('Se connecter'); // Replace 'MyScreen' with the actual name of your screen
        }, [])
    );

    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
        return re.test(String(email).toLowerCase());
    }


    const handleLogin = async () => {
        if (!validateEmail(email)) {
            // Si l'email n'est pas valide, affiche un message d'erreur et ne continue pas
            setEmailError("Veuillez entrer une adresse email valide.");
            return;
        }

        setEmailError(""); // Réinitialiser l'erreur d'email s'il n'y en a pas
        try {
            const response = await fetch(
                "https://gourmandise.mgueye-ba.v70208.campus-centre.fr/api/login",
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        motdepasse,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok && data.success) {
                await AsyncStorage.setItem('userEmail', email); // Stockez l'email de l'utilisateur
                await AsyncStorage.setItem('userToken', data.token);
                await AsyncStorage.setItem('userCodec', JSON.stringify(data.user.codec));

                setModalVisible(true);
                setTimeout(() => {
                    setModalVisible(false);
                    login(data.token, data.user);
                    navigation.navigate('Accueil');
                }, 2000);

            } else {
                // Utilisez `passwordError` pour afficher un message d'erreur spécifique lié au mot de passe
                if (data.message.includes("mot de passe incorrect")) { // Adaptez cette condition selon le message d'erreur exact de votre API
                    setPasswordError("L'adresse mail ou le mdp ne sont pas corrects.");
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Échec de la connexion',
                        text2: data.message || "Une erreur s'est produite.",
                    });
                }
            }
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
            Toast.show({
                type: 'error',
                text1: 'Erreur de connexion',
                text2: 'Une erreur inattendue s\'est produite.',
            });
        }
    };

    const handleForgotPassword = () => {
    // Gestion du "Mot de passe oublié"
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://i.ibb.co/Q9Pjm80/logo.png" }}
        style={styles.logo}
      />
      <Text style={[styles.label, { color: "black" }]}>Email:</Text>
      <TextInput
          style={[styles.input, focusedField === 'email' ? localStyles.focusedInput : {}]}
          onFocus={() => setFocusedField('email')}
          onBlur={() => setFocusedField(null)}
        value={email}
        onChangeText={setEmail}
        placeholder="Entrez votre email"
        placeholderTextColor="grey"
      />
        <View style={localStyles.passwordContainer}>
            <TextInput
                style={[styles.input, focusedField === 'motdepasse' ? localStyles.focusedInput : {}]}
                onFocus={() => setFocusedField('motdepasse')}
                onBlur={() => setFocusedField(null)}
                value={motdepasse}
                onChangeText={setPassword}
                placeholder="Entrez votre mot de passe"
                secureTextEntry={!passwordVisible}
                placeholderTextColor="grey"
            />

            <TouchableOpacity
                onPress={() => setPasswordVisible(!passwordVisible)}
                style={localStyles.visibilityToggle}
            >
                <Entypo styles name={passwordVisible ? "eye" : "eye-with-line"} size={24} color="grey" />
            </TouchableOpacity>
        </View>
        {emailError ? <Text style={{ color: 'red' }}>{emailError}</Text> : null}
        {passwordError ? <Text style={{ color: 'red' }}>{passwordError}</Text> : null}
        <Text style={styles.forgotPassword} onPress={handleForgotPassword}>
        Mot de passe oublié ?
      </Text>
      <Button
        style={styles.btn}
        title="Se connecter"
        onPress={handleLogin}
        buttonStyle={styles.loginButton}
      />
      <Button
        style={styles.btn}
        title="Créer un compte"
        onPress={() => {
          navigation.navigate("Créer compte");
        }}
        buttonStyle={styles.loginButton}
      />
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
                    <Text style={localStyles.modalText}>Connexion effectuée avec succès</Text>
                </View>
            </View>
        </Modal>
    </View>
  );
}
