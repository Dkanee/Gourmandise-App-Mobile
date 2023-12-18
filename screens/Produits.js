// import React, { Component, useEffect, useState } from "react";
// import {
//   Button,
//   FlatList,
//   Image,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// // import AsyncStorage from "@react-native-async-storage/async-storage";
// import { GlobalStyles } from "../styles/AppStyles";
// import navigation from "../component/navigation";
// import Home from "./Home";
// import Ionicons from "react-native-vector-icons/Ionicons";
//
// export default function Produits({ navigation }) {
//   const [data, setData] = useState([]);
//
//   //Fonction pour récup les données de l'API
//   const fetchData = async () => {
//     try {
//       const newData = await fetch(
//         "http://94.247.183.122/plesk-site-preview/asalomon.v70208.campus-centre.fr/https/94.247.183.122/api/products",
//         {
//           method: "GET",
//           headers: {
//             accept: "application/json",
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       const jsonData = await newData.json();
//
//       //On stock les données dans le async storage
//       await AsyncStorage.setItem("data", JSON.stringify(jsonData));
//
//       //Metre a jour l'état de data avec les nouvelles données
//       setData(jsonData);
//       console.log(data);
//     } catch (err) {
//       console.error(err);
//     }
//   };
//
//   const fetchDataLocal = async () => {
//     try {
//       const storedData = await AsyncStorage.getItem("data");
//       if (storedData != null) {
//         setData(JSON.parse(storedData));
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };
//
//   const displayProducts = () => {
//     return data.results.map((produit, index) => (
//       <View key={index}>{produit.designation}</View>
//     ));
//   };
//
//   useEffect(() => {
//     fetchData();
//   }, []);
//
//   return (
//     <View>
//       <View style={GlobalStyles.containerNav}>
//         <TouchableOpacity onPress={() => navigation.openDrawer()}>
//           <Ionicons name="menu-outline" size={22} />
//         </TouchableOpacity>
//         <Text style={GlobalStyles.titleNav}>Produits</Text>
//       </View>
//       <View>
//         <FlatList data={data.results} renderItem={displayProducts} />
//       </View>
//     </View>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Produits({ navigation }) {
  const [data, setData] = useState([]);

  // Fonction pour récupérer les données de l'API
  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://94.247.183.122/plesk-site-preview/asalomon.v70208.campus-centre.fr/https/94.247.183.122/api/products",
        {
          method: "GET",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const jsonData = await response.json();
      await AsyncStorage.setItem("data", JSON.stringify(jsonData));
      setData(jsonData); // Assurez-vous que cela correspond à la structure de vos données
    } catch (err) {
      console.error(err);
    }
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // Composant pour afficher chaque produit
  const renderItem = ({ item }) => (
    <View style={styles.productItem}>
      <Text>{item.designation}</Text>
      {/* Ajoutez d'autres détails du produit ici */}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.containerNav}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu-outline" size={22} />
        </TouchableOpacity>
        <Text style={styles.titleNav}>Produits</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.reference.toString()} // Clé basée sur la référence
      />
    </View>
  );
}

// Styles pour le composant Produits
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 40,
    backgroundColor: "#f0f0f0",
  },
  titleNav: {
    fontSize: 18,
    marginLeft: 10,
  },
  productItem: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#e0e0e0",
  },
});
