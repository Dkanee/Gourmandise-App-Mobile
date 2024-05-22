// import React, { useState, useContext } from 'react';
// import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
// import { AuthContext } from '../middleware/AuthContext';
// import AsyncStorage from "@react-native-async-storage/async-storage";
//
// const ModifyProfil = ({ navigation }) => {
//     const { userInfo } = useContext(AuthContext);
//     const [nom, setNom] = useState(userInfo.nom);
//     const [adresse, setAdresse] = useState(userInfo.adresse);
//     const [cp, setCp] = useState(userInfo.cp);
//     const [ville, setVille] = useState(userInfo.ville);
//     const [telephone, setTelephone] = useState(userInfo.telephone);
//     const [email, setEmail] = useState(userInfo.email);
//     const codec = userInfo.codec;
//
//     const updateUserProfile = async () => {
//         const userToken = await AsyncStorage.getItem('userToken');
//
//         try {
//             const response = await fetch('https://gourmandise.mgueye-ba.v70208.campus-centre.fr/api/updateclient', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${userToken}`, // Assurez-vous d'inclure le token ici
//
//                 },
//                 body: JSON.stringify({
//                     nom,
//                     adresse,
//                     cp,
//                     ville,
//                     telephone,
//                     email,
//                     codec
//                 })
//
//             });
//
//
//             if (response.ok) {
//                 Alert.alert("Profil mis à jour", "Votre profil a été mis à jour avec succès.");
//                 navigation.goBack();
//             } else {
//                 Alert.alert("Erreur", "Une erreur est survenue lors de la mise à jour du profil.");
//
//             }
//         } catch (error) {
//             console.error(error);
//             Alert.alert("Erreur", "Une erreur est survenue lors de la mise à jour du profil.");
//         }
//     };
//
//     return (
//         <View style={styles.container}>
//             <TextInput
//                 style={styles.input}
//                 onChangeText={setNom}
//                 value={nom}
//                 placeholder="Nom"
//             />
//             <TextInput
//                 style={styles.input}
//                 onChangeText={setAdresse}
//                 value={adresse}
//                 placeholder="Adresse"
//             />
//             <TextInput
//                 style={styles.input}
//                 onChangeText={setCp}
//                 value={cp}
//                 placeholder="Code Postal"
//             />
//             <TextInput
//                 style={styles.input}
//                 onChangeText={setVille}
//                 value={ville}
//                 placeholder="Ville"
//             />
//             <TextInput
//                 style={styles.input}
//                 onChangeText={setTelephone}
//                 value={telephone}
//                 placeholder="Téléphone"
//             />
//             <TextInput
//                 style={styles.input}
//                 onChangeText={setEmail}
//                 value={email}
//                 placeholder="Email"
//                 editable={false} // L'email ne peut pas être modifié
//             />
//             <Button
//                 title="Mettre à jour le profil"
//                 // onPress={updateUserProfile}
//             />
//         </View>
//     );
// };
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         padding: 20,
//     },
//     input: {
//         height: 40,
//         margin: 12,
//         borderWidth: 1,
//         padding: 10,
//         width: '100%',
//         borderRadius:10,
//     },
// });
//
// export default ModifyProfil;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ModifyProfil = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>En cours de développement, veuillez patienter s'il vous plaît...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5', // Vous pouvez changer la couleur de fond si nécessaire
    },
    text: {
        fontSize: 19 , // Vous pouvez ajuster la taille du texte si nécessaire
        textAlign: 'center',
    },
});

export default ModifyProfil;

