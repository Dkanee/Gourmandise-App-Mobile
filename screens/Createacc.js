import React, { useState } from "react";
import {
    SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import LoginScreen from "./LoginScreen";
import Navigation from "../component/Navigation"
import { Button } from "react-native-elements";
import { styles } from "../styles/AppStyles";

const { width, height } = Dimensions.get("window"); // Obtenez les dimensions de l'écran
export default function Createacc({ navigation }) {
  const [nom, setNom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [cp, setCp] = useState("");
  const [ville, setVille] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [motdepasse, setPassword] = useState("");

  const createAccount = async () => {
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
        console.log("Création de compte bien effectuée");
      } else {
        // Gérez les autres erreurs HTTP ici
        console.error("Réponse HTTP non OK :", response.status);
        throw new Error("Échec de la création de compte");
      }
    } catch (error) {
      console.error("Erreur lors de la création du compte :", error);
    }
  };

  return (

      <SafeAreaView style={styles.container}>
        <Image
          source={{ uri: "https://i.ibb.co/Q9Pjm80/logo.png" }}
          style={styles.logo1}
        />

        <Text style={[styles.label, { color: "black" }]}>Nom:</Text>
        <TextInput
          style={styles.input}
          value={nom}
          onChangeText={setNom}
          placeholder="Entrez votre nom"
          placeholderTextColor="white"
        />

        <Text style={[styles.label, { color: "black" }]}>Adresse:</Text>
        <TextInput
          style={styles.input}
          value={adresse}
          onChangeText={setAdresse}
          placeholder="Entrez votre adresse"
          placeholderTextColor="white"
        />

        <Text style={[styles.label, { color: "black" }]}>Code Postal:</Text>
        <TextInput
          style={styles.input}
          value={cp}
          onChangeText={setCp}
          placeholder="Entrez votre code postal"
          placeholderTextColor="white"
        />

        <Text style={[styles.label, { color: "black" }]}>Ville:</Text>
        <TextInput
          style={styles.input}
          value={ville}
          onChangeText={setVille}
          placeholder="Entrez votre ville"
          placeholderTextColor="white"
        />

        <Text style={[styles.label, { color: "black" }]}>Téléphone:</Text>
        <TextInput
          style={styles.input}
          value={telephone}
          onChangeText={setTelephone}
          placeholder="Entrez votre n° de téléphone"
          placeholderTextColor="white"
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
        <Text style={styles.forgotPassword}>Vous avez déjà un compte ?</Text>
          <Button
              title="Se connecter"
              onPress={() => navigation.navigate('Login')}
              buttonStyle={styles.loginButton}
          />
      </SafeAreaView>
  );
}
