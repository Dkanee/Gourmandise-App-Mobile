import React, { useState } from "react";
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


const { width, height } = Dimensions.get("window"); // Obtenez les dimensions de l'écran

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [motdepasse, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "http://94.247.183.122/plesk-site-preview/asalomon.v70208.campus-centre.fr/https/94.247.183.122/api/login",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            motdepasse,
          }),
        }
      );
      console.log(response.status);

      if (response.ok) {
        const data = await response.json();

        if (data && data.success) {
          // La connexion a réussi
          console.log("Bien joué");
        } else {
          // Gérez l'échec de la connexion, par exemple, affichez un message d'erreur.
          console.error("Échec de la connexion");
        }
      } else {
        // Gérez les erreurs HTTP (par exemple, 401 Unauthorized, 500 Internal Server Error, etc.).
        console.error("Erreur HTTP lors de la connexion:", response.status);
      }
    } catch (error) {
      // Gérez les autres erreurs
      console.error("Erreur lors de la connexion :", error);
    }
  };
  const handleForgotPassword = () => {
    // Gestion du "Mot de passe oublié"
  };

  const handleCreateAccount = () => {
    // Gestion de la création de compte
  };

  return (
    <ImageBackground
      source={{
        uri: "https://i.ibb.co/ryk7s3y/dkane-image-confiseries-de-luxe-a-base-de-chocolat-de-haute-qu-5bf4147b-d576-41d4-a829-cbdcd9b9ede7.png",
      }}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Image
          source={{ uri: "https://i.ibb.co/Q9Pjm80/logo.png" }}
          style={styles.logo}
        />
        <Text style={[styles.label, { color: "white" }]}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Entrez votre email"
          placeholderTextColor="white"
        />
        <Text style={[styles.label, { color: "white" }]}>Mot de passe:</Text>
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
          title="Se connecter"
          onPress={handleLogin}
          buttonStyle={styles.loginButton}
        />
        <Button
          title="Créer un compte"
          onPress={handleCreateAccount}
          buttonStyle={styles.loginButton}
        />
      </View>
    </ImageBackground>
  );
}
