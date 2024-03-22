import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, TextInput } from 'react-native';
import {Entypo, MaterialIcons} from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';

const Panier = () => {
    const [articlesPanier, setArticlesPanier] = useState([
        // { id: '1004', nom: "TARTE MIGHTY CHOCOLAT",  prix: 23, quantite: 1, image: "https://cdn.pixabay.com/photo/2017/05/04/21/23/cupcakes-2285209_1280.jpg" },
        // { id: '1007', nom: "CREPE BANANE CHOCOLAT", prix: 18, quantite: 1, image: "https://cdn.pixabay.com/photo/2018/12/04/21/15/gingerbread-3856631_1280.jpg" },
        // { id: '1015', nom: "SUCETTE BOULE FRUIT",  prix: 24.50, quantite: 1, image: "https://cdn.pixabay.com/photo/2017/06/22/10/01/hands-2430200_1280.jpg" },

    ]);

    const ajusterQuantite = (id, delta) => {
        setArticlesPanier(articlesPanier.map(article => {
            if (article.id === id) {
                return { ...article, quantite: Math.max(1, article.quantite + delta) };
            }
            return article;
        }));
    };

    const supprimerArticleDuPanier = async (idArticleASupprimer) => {
        // Récupérer le panier actuel
        const cartJson = await AsyncStorage.getItem('cart');
        let cart = cartJson ? JSON.parse(cartJson) : [];

        // Filtrer le panier pour supprimer l'article avec l'id spécifié
        const nouveauPanier = cart.filter(article => article.id !== idArticleASupprimer);

        // Sauvegarder le nouveau panier dans AsyncStorage
        await AsyncStorage.setItem('cart', JSON.stringify(nouveauPanier));

        // Mettre à jour l'état local si nécessaire
        // Si cette fonction est dans le même composant que l'état du panier,
        // vous pouvez simplement appeler setArticlesPanier(nouveauPanier) ici.
        // Sinon, vous devrez trouver un moyen de déclencher cette mise à jour depuis le composant concerné.
        setArticlesPanier(nouveauPanier);
    };


    const totalPanier = articlesPanier.reduce((total, article) => total + article.prix * article.quantite, 0).toFixed(2);

    useFocusEffect(
        React.useCallback(() => {
            const fetchCart = async () => {
                const cartJson = await AsyncStorage.getItem('cart');
                const cart = cartJson ? JSON.parse(cartJson) : [];
                setArticlesPanier(cart);
            };

            fetchCart();
        }, [])
    );


    return (
        <View style={styles.container}>
            <FlatList
                data={articlesPanier}
                keyExtractor={(item) => item.id ? item.id: item.reference}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={{ uri: item.image }} style={styles.productImage} />
                        <View style={styles.articleDetails}>
                            <Text style={styles.articleNom}>{item.nom}</Text>
                            {/* Icône text-document */}
                            <TouchableOpacity onPress={() => openModal(item)} style={styles.iconContainer}>
                                <Entypo name="text-document" size={24} color="#582900" />
                            </TouchableOpacity>
                            <View style={styles.prixQuantiteContainer}>
                                <View style={styles.quantiteContainer}>
                                    <TouchableOpacity onPress={() => ajusterQuantite(item.id, -1)}>
                                        <MaterialIcons name="remove" size={24} color="#333" />
                                    </TouchableOpacity>

                                    <TextInput
                                        style={styles.quantiteText}
                                        value={item.quantite.toString()}
                                        keyboardType="numeric"
                                        onChangeText={(text) => {
                                            const newQuantity = parseInt(text) || 0;
                                            setArticlesPanier(articlesPanier.map(article => {
                                                if (article.id === item.id) {
                                                    return { ...article, quantite: newQuantity };
                                                }
                                                return article;
                                            }));
                                        }}
                                    />
                                    <TouchableOpacity onPress={() => ajusterQuantite(item.id, 1)}>
                                        <MaterialIcons name="add" size={24} color="#333" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.iconTrash} onPress={() => supprimerArticleDuPanier(item.id, -1) }>
                                        <Entypo name="trash" size={24} color="#9E2B40"  />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.articlePrix}>{item.prix} €</Text>
                            </View>
                        </View>
                    </View>
                )}
            />
            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total: €{totalPanier}</Text>
                <TouchableOpacity style={styles.checkoutButton}>
                    <Text style={styles.checkoutButtonText}>Paiement</Text>
                </TouchableOpacity>
            </View>
        </View>



    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 21,
        backgroundColor: '#f2f2f2',
    },
    iconContainer:{
        position: 'static',
        //paddingLeft:90,
        top: -30,
        right: -200,
        padding: 5,
        borderRadius: 5,
        zIndex: 1,
    },

    iconTrash:{
        paddingLeft:10,

    },
    card: {
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    productImage: {
        width: 80, // Ajuster la largeur de l'image
        height: 80, // Ajuster la hauteur de l'image
        borderRadius: 10,
        marginRight: 20,
    },
    articleDetails: {
        flex: 1,
    },
    articleNom: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    prixQuantiteContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap', // Permet le retour à la ligne des éléments
    },
    articlePrix: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginBottom: 5, // Ajout d'un espace en bas
    },
    quantiteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantiteText: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        width: 50,
        textAlign: 'center',
    },
    totalContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    checkoutButton: {
        marginTop: 10,
        backgroundColor: '#781e1e',
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 5,
    },
    checkoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Panier;


