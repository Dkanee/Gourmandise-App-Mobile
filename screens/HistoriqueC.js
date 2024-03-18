// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
//
// const HistoriqueCommandes = ({ userEmail }) => {
//     const [commandes, setCommandes] = useState([]);
//
//     useEffect(() => {
//         const fetchCommandes = async () => {
//             const token = localStorage.getItem('userToken'); // Assurez-vous de stocker le token lors de la connexion
//             try {
//                 const response = await axios.get('https://gourmandise.mgueye-ba.v70208.campus-centre.fr/api/dernierescommandes/', {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     },
//                     params: {
//                         email: userEmail // Ou utilisez codec si votre API le requiert
//                     }
//                 });
//                 setCommandes(response.data);
//             } catch (error) {
//                 console.error('Erreur lors de la récupération des commandes', error);
//             }
//         };
//
//         fetchCommandes();
//     }, [userEmail]);
//
//     return (
//         <div>
//             <h2>Historique des Commandes</h2>
//             <ul>
//                 {commandes.map((commande) => (
//                     <li key={commande.numero}>
//                         Commande #{commande.numero} - Total HT: {commande.commande_total_ht}€ - État: {commande.etat}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };
//
// export default HistoriqueCommandes;

import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';


const commandesFictives = [
    {
        id: '1',
        numero: '1001',
        date_commande: '2024-02-20',
        total_ht: '150.00',
        etat: 'Livré'
    },
    {
        id: '2',
        numero: '1002',
        date_commande: '2024-02-22',
        total_ht: '90.00',
        etat: 'En cours'
    },

];

const HistoriqueC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Historique des Commandes</Text>
            <FlatList
                data={commandesFictives}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.commandeContainer}>
                        <Text style={styles.commandeText}>Commande #{item.numero}</Text>
                        <Text>Date: {item.date_commande}</Text>
                        <Text>Total HT: {item.total_ht}€</Text>
                        <Text>État: {item.etat}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    commandeContainer: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
    },
    commandeText: {
        fontSize: 18,
        fontWeight: '600',
    },
});

export default HistoriqueC;

