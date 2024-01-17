import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { SafeAreaView } from "react-native-safe-area-context";

export default function Produits({ navigation }) {
  const [data, setData] = useState([]);

  // Fonction pour récupérer les données de l'API
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://asalomon.v70208.campus-centre.fr/api/products",
        {
          method: "GET",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      console.log();

      const jsonData = await response.json();
      const productsWithQuantity = jsonData.map((item) => ({
        ...item,
        quantity: 1,
      })); // Add a quantity property
      await AsyncStorage.setItem("data", JSON.stringify(productsWithQuantity));
      setData(productsWithQuantity);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleQuantityChange = (item, delta) => {
    setData((currentData) =>
      currentData.map((prod) => {
        if (prod.reference === item.reference) {
          const newQuantity = Math.max(1, prod.quantity + delta);
          return { ...prod, quantity: newQuantity };
        }
        return prod;
      })
    );
  };
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={require("../assets/product.png")}
        //source={item.url} Gérer ici l'affichage des images avec le champ souhaité
        style={styles.productImage}
      />
      <View style={styles.cardContent}>
        <Text style={styles.productName}>{item.designation}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => handleQuantityChange(item, -1)}>
            <Ionicons name="remove-circle-outline" size={24} color="black" />
          </TouchableOpacity>
          <Text>{item.quantity}</Text>
          <TouchableOpacity onPress={() => handleQuantityChange(item, 1)}>
            <Ionicons name="add-circle-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.productPrice}>
          {(
            (item.prix_unitaire_HT * 0.2 + item.prix_unitaire_HT) *
            item.quantity
          ).toFixed(2)}
          €
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.containerNav}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu-outline" style={styles.menuIcon} />
        </TouchableOpacity>
        <Text style={styles.titleNav}>Produits</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.reference.toString()} // clé basée sur la référence
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Centre verticalement les éléments
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 10, // Ajout d'un padding en bas pour un meilleur espacement
    backgroundColor: "#582900",
  },
  titleNav: {
    fontSize: 22, // Taille de police augmentée pour le titre
    fontWeight: "bold", // Rendre le titre plus épais
    flex: 1,
    textAlign: "center", // Centrer le titre
    marginLeft: -40, // Ajuster cette valeur en fonction de la taille de votre icône de menu
    color: "#FFFFFF",
  },
  //Style pour le format de la Card dans Produits
  card: {
    flexDirection: "row",
    padding: 16,
    marginVertical: 12,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 0,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: "grey",
  },
  menuIcon: {
    fontSize: 28,
    color: "#FFFFFF",
  },
});
