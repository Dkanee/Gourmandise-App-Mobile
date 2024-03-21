import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Button } from "react-native-elements";
import { styles } from "../styles/AppStyles";
import { AuthContext } from "../middleware/AuthContext";
import navigation from "../component/Navigation";
import Toast from "react-native-toast-message";
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get("window"); // Obtenirr les dimensions de l'écran

export default function LoginScreen({ title }) {
    const navigation=useNavigation();
  const [email, setEmail] = useState("");
  const [motdepasse, setPassword] = useState("");
  const { login } = useContext(AuthContext);

    const handleLogin = async () => {
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

            if (response.ok) {
                const data = await response.json();
                if (data && data.success) {
                    // Ici, vous devez passer le token et les informations de l'utilisateur à la fonction login
                    login(data.token, data.user); // Assurez-vous que l'API renvoie un objet `user` avec les infos nécessaires
                    navigation.navigate("Accueil");
                    console.log(data.token, data.user);
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Échec de la connexion',
                        text2: data.message || "Une erreur s'est produite.",
                    });
                }
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Erreur de connexion',
                    text2: `Erreur HTTP: ${response.status}`,
                });
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

  const handleCreateAccount = () => {
    // Gestion de la création de compte
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://i.ibb.co/Q9Pjm80/logo.png" }}
        style={styles.logo}
      />
      <Text style={[styles.label, { color: "black" }]}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Entrez votre email"
        placeholderTextColor="white"
      />
      <Text style={[styles.label, { color: "black" }]}>Mot de passe:</Text>
      <TextInput
        style={styles.input}
        value={motdepasse}
        onChangeText={setPassword}
        placeholder="Entrez votre mot de passe"
        secureTextEntry
        placeholderTextColor="white"
      />
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
          navigation.navigate("Createacc");
        }}
        buttonStyle={styles.loginButton}
      />
    </View>
  );
}
