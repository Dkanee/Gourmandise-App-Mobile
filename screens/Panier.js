import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, TextInput } from 'react-native';
import {Entypo, MaterialIcons} from '@expo/vector-icons';

const PanierScreen = () => {
    const [articlesPanier, setArticlesPanier] = useState([
        { id: '1004', nom: "MUF&GO 500 G", description: "N", prix: 23, quantite: 1, image: "https://cdn.pixabay.com/photo/2017/05/04/21/23/cupcakes-2285209_1280.jpg" },
        { id: '1007', nom: "BISCUI'T 500 G", description: "C", prix: 18, quantite: 1, image: "https://cdn.pixabay.com/photo/2018/12/04/21/15/gingerbread-3856631_1280.jpg" },
        { id: '1015', nom: "CACAO 500 G", description: "N", prix: 24.50, quantite: 1, image: "https://cdn.pixabay.com/photo/2017/06/22/10/01/hands-2430200_1280.jpg" },
    ]);

    const ajusterQuantite = (id, delta) => {
        setArticlesPanier(articlesPanier.map(article => {
            if (article.id === id) {
                return { ...article, quantite: Math.max(1, article.quantite + delta) };
            }
            return article;
        }));
    };

    const totalPanier = articlesPanier.reduce((total, article) => total + article.prix * article.quantite, 0).toFixed(2);

    return (
        <View style={styles.container}>
            <FlatList
                data={articlesPanier}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={{ uri: item.image }} style={styles.productImage} />
                        <View style={styles.articleDetails}>
                            <Text style={styles.articleNom}>{item.nom}</Text>
                            {/* Icône text-document */}
                            <TouchableOpacity onPress={() => openModal(item)} style={styles.iconContainer}>
                                <Entypo name="text-document" size={24} color="#582900" />
                            </TouchableOpacity>
                            <Text style={styles.articleDescription}>{item.description}</Text>
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
                    <Text style={styles.checkoutButtonText}>Passer à la caisse</Text>
                </TouchableOpacity>
            </View>
        </View>



    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f2f2f2',
    },

    iconContainer:{
        position: 'absolute',
        top: 0,
        right: 0,
        //backgroundColor: '#582900',
        padding: 5,
        marginBottom:5,
        borderRadius: 5,
        zIndex: 1, // Pour s'assurer que l'icône reste au-dessus du contenu de la carte
    },

    card: {
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    productImage: {
        width: 90,
        height: 90,
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
    articleDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    prixQuantiteContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    articlePrix: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
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

export default PanierScreen;
