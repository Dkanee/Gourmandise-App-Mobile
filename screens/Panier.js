import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Image,
    TextInput,
    Modal,
    ScrollView,
    Pressable
} from 'react-native';
import {Entypo, MaterialIcons} from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from "react-native-vector-icons/Ionicons";
import {stylesProduits} from "../styles/ProduitStyles";
import {styles} from "../styles/PanierStyles";


const Panier = () => {
    const [articlesPanier, setArticlesPanier] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);


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

    const openModal = (product) => {

        if (!product.quantity) {
            product.quantity = 1;
        }

        setSelectedProduct({ ...product, inputQuantity: product.quantity.toString() });
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            {articlesPanier.length > 0 ? (
                <FlatList
                    data={articlesPanier}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Image source={{ uri: item.image }} style={styles.productImage} />
                            <View style={styles.articleDetails}>
                                <Text style={styles.articleNom}>{item.nom}</Text>
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
                                            editable={false}
                                        />
                                        <TouchableOpacity onPress={() => ajusterQuantite(item.id, 1)}>
                                            <MaterialIcons name="add" size={24} color="#333" />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.iconTrash} onPress={() => supprimerArticleDuPanier(item.id)}>
                                            <Entypo name="trash" size={24} color="#9E2B40" />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={styles.articlePrix}>{`${(parseFloat(item.prix)).toFixed(2)} €`}</Text>

                                </View>
                            </View>
                        </View>
                    )}
                />
            ) : (
                // Si le panier est vide, affichez un tumbleweed
                <View style={styles.emptyContainer}>
                    <Image
                        source={{ uri: "https://cdn.dribbble.com/users/860366/screenshots/6364054/desolazione_empty_1.gif" }} // Remplacez par l'URL de votre image
                        style={styles.tumbleweedImage}
                    />
                    <Text style={styles.panierVide}>Le panier est vide...</Text>
                </View>
            )}
            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total: €{totalPanier}</Text>
                <TouchableOpacity style={styles.checkoutButton}>
                    <Text style={styles.checkoutButtonText}>Paiement</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}>
                <ScrollView style={stylesProduits.fullScreenModal}>
                    {selectedProduct && (
                        <>
                            <Image source={{ uri: selectedProduct.url_image }} style={stylesProduits.fullSizeImage} />
                            <View style={stylesProduits.modalContent}>
                                <Text style={stylesProduits.modalProductName}>{selectedProduct.designation}</Text>
                                <Text style={stylesProduits.modalProductDescription}>{selectedProduct.description}</Text>
                                <Text style={stylesProduits.modalProductPrice}>
                                    Prix: {((selectedProduct.prix_unitaire_HT * 0.2 + selectedProduct.prix_unitaire_HT)).toFixed(2)}€
                                </Text>

                            </View>
                        </>
                    )}
                </ScrollView>
                <TouchableOpacity
                    style={stylesProduits.closeButton}
                    onPress={() => setModalVisible(false)}>
                    <Text style={stylesProduits.closeButtonText}>X</Text>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};


export default Panier;