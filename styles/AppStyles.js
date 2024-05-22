import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1, // Utilisez flex pour remplir toute la hauteur de l'écran
    width: "100%", // Utilisez 100% de la largeur de l'écran
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "row",
    padding: 47,
  },



  container1: {
    flex: 1,
    paddingLeft : 50,
    // justifyContent: "center",
    // alignItems: "center",
    //padding: 21,
  },
  logo: {
    width: 130,
    height: 130,
    marginTop: 90,
    alignItems: "center",
    marginLeft:80,
    marginBottom: 10,



  },

  logo1: {

    justifyContent: "center",
    alignItems:"center",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
    textAlign:'left',

  },
  input: {
    height: 40,
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 8, // Essayez une valeur plus grande
    marginBottom: 15,
    paddingHorizontal: 10,
    width: 300,
    backgroundColor: "white",
    color: "black",
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
  loginButton1: {
    backgroundColor: "#aabbff",
    padding:100,
  },
  createAcc: {
    backgroundColor: "#7B3F00",
    marginBottom: 120,
  },
  btn:{
    margin: -100,
  },
});
