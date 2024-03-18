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

const { width, height } = Dimensions.get("window"); // Obtenirr les dimensions de l'écran

export default function LoginScreen({ title ,navigation }) {
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
          login();
          navigation.navigate("Home");
        } else {
          console.error("Échec de la connexion");
        }
      } else {
        console.error("Erreur HTTP lors de la connexion:", response.status);
      }
    } catch (error) {
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
