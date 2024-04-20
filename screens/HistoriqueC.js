import React, { useState, useEffect } from 'react';
import {View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { RefreshControl } from 'react-native';
import {useHistoryNavigation} from "../middleware/NavigationHistoryContext";


const HistoriqueC = (route) => {
    const [commandes, setCommandes] = useState([]);
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    const { addRouteToHistory } = useHistoryNavigation();

    useFocusEffect(
        React.useCallback(() => {
            addRouteToHistory('Détails de la commande'); // Replace 'MyScreen' with the actual name of your screen
        }, [])
    );


    const fetchDernieresCommandes = async () => {
        try {
            const codec = await AsyncStorage.getItem('userCodec');
            const userToken = await AsyncStorage.getItem('userToken');

            const response = await fetch(`https://gourmandise.mgueye-ba.v70208.campus-centre.fr/api/dernierescommandes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`,
                },
                body: JSON.stringify({ codec })
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des dernières commandes');
            }


            const result = await response.json();
            setCommandes(result);
        } catch (error) {
            console.error(error);
        }

    };
    useFocusEffect(
        React.useCallback(() => {
            fetchDernieresCommandes();
        }, [])
    );

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchDernieresCommandes().then(() => setRefreshing(false));
    }, []);




    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={commandes}
                keyExtractor={item => String(item.numero)}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Détails de la commande', { commande: item })} // Utilisez le bon nom d'écran
                    >
                        <View style={styles.commandeContainer}>
                            <Text style={styles.commandeText}>Commande N°{item.numero}</Text>
                            <Text>Total TTC: {parseFloat(item.totalTVA + item.totalHT).toFixed(2)}€</Text>
                            {/* Affichez plus de détails de la commande ici si nécessaire */}
                        </View>
                    </TouchableOpacity>
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
            />
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    commandeContainer: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
    },
    commandeText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default HistoriqueC;
