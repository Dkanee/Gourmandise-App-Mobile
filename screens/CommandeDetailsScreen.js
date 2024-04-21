import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import {useHistoryNavigation} from "../middleware/NavigationHistoryContext";
import {useFocusEffect} from "@react-navigation/native";
// import Navigation from "../component/Navigation";

const CommandeDetailsScreen = ({ route }) => {
    const { commande } = route.params;
    const { addRouteToHistory } = useHistoryNavigation();

    useFocusEffect(
        React.useCallback(() => {
            addRouteToHistory('Détails de la commande');
        }, [])
    );


    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={commande.produits}
                keyExtractor={(item, index) => String(index)}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={{ uri: item.urlImage }} style={styles.image} />
                        <View style={styles.details}>
                            <Text style={styles.title}>{item.designation}</Text>
                            <Text>Quantité: {item.quantite}</Text>
                            <Text>Prix unitaire: {item.prixHT.toFixed(2)}€</Text>
                            <Text>Total: {(item.prixHT * item.quantite).toFixed(2)}€</Text>
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        flexDirection: 'row',
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 5,
        marginRight: 10,
    },
    details: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CommandeDetailsScreen;
