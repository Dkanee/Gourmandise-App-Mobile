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
    const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] = useState(false);
    const [productToDeleteId, setProductToDeleteId] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);


    const ajusterQuantite = async (id, delta) => {
        const updatedArticlesPanier = articlesPanier.map(article => {
            if (article.id === id) {
                return { ...article, quantite: Math.max(1, article.quantite + delta) };
            }
            return article;
        });

        setArticlesPanier(updatedArticlesPanier);

        // Mise à jour AsyncStorage avec les nouvelles quantités
        await AsyncStorage.setItem('cart', JSON.stringify(updatedArticlesPanier));
    };

    const openConfirmDeleteModal = (id) => {
        setProductToDeleteId(id);
        setConfirmDeleteModalVisible(true);
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


    //const totalPanier = articlesPanier.reduce((total, article) => total + article.prix * article.quantite, 0).toFixed(2);
    const totalPanier = articlesPanier.reduce((total, article) => total + (parseFloat(article.prixHT) * article.quantite), 0).toFixed(2);

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
        setSelectedProduct(product);
        setModalVisible(true);
        console.log(product);
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
                                        <TouchableOpacity style={styles.iconTrash} onPress={() => openConfirmDeleteModal(item.id)}>
                                            <Entypo name="trash" size={24} color="#9E2B40" />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={styles.articlePrix}>{`${(parseFloat(item.prixHT) * item.quantite).toFixed(2)} €`}</Text>

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
                transparent={true}
                visible={confirmDeleteModalVisible}
                onRequestClose={() => setConfirmDeleteModalVisible(!confirmDeleteModalVisible)}
            >
                <View style={stylesProduits.centeredView2}>
                    <View style={stylesProduits.modalView2}>
                        <Text style={stylesProduits.textStyle2}>Êtes-vous sûr de vouloir supprimer cet article du panier ?</Text>
                        <Pressable
                            style={[stylesProduits.button3]}
                            onPress={() => {
                                supprimerArticleDuPanier(productToDeleteId);
                                setConfirmDeleteModalVisible(!confirmDeleteModalVisible);
                            }}
                        >
                            <Text style={stylesProduits.textStyle}>Supprimer</Text>
                        </Pressable>
                        <Pressable
                            style={[stylesProduits.button2]}
                            onPress={() => setConfirmDeleteModalVisible(!confirmDeleteModalVisible)}
                        >
                            <Text style={stylesProduits.textStyle}>Annuler</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>


            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <ScrollView style={stylesProduits.fullScreenModal}>
                    {selectedProduct && (
                        <>
                            <Image source={{ uri: selectedProduct.image}} style={stylesProduits.fullSizeImage} />
                            <View style={stylesProduits.modalContent}>
                                <Text style={stylesProduits.modalProductName}>{selectedProduct.nom}</Text>
                                <Text style={stylesProduits.modalProductDescription}>{selectedProduct.description}</Text>
                                <Text style={stylesProduits.modalProductPrice}>
                                    Prix HT: {selectedProduct.prixHT.toFixed(2)}€
                                </Text>
                            </View>
                        </>
                    )}
                </ScrollView>
                <TouchableOpacity
                    style={stylesProduits.closeButton}
                    onPress={() => setModalVisible(false)}
                >
                    <Text style={stylesProduits.closeButtonText}>X</Text>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};


export default Panier;