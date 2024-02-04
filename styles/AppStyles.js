import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1, // Utilisez flex pour remplir toute la hauteur de l'écran
    width: "100%", // Utilisez 100% de la largeur de l'écran
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 21,
  },
  logo: {
    width: 130,
    height: 130,
    marginBottom: 2,

  },

  logo1: {
    width: 120,
    height: 110,
    marginBottom: 2,
    marginTop:45,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20, // Essayez une valeur plus grande
    marginBottom: 15,
    paddingHorizontal: 10,
    width: 300,
    backgroundColor: "#8A6642",
    color: "#FFFFFF",
  },

  forgotPassword: {
    fontSize: 14,
    color: "#007AFF",
    marginBottom: 10,
    textDecorationLine: "underline",
  },
  loginButton: {
    backgroundColor: "#7B3F00",
    marginBottom: 20,
  },
  createAcc: {
    backgroundColor: "#7B3F00",
    marginBottom: 120,
  },
  btn:{
    margin: -100,
  },
});
