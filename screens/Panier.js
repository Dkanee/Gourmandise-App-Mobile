import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
// import { AuthContext } from '../middleware/AuthContext'; // Assurez-vous que le chemin d'importation est correct

const PanierScreen = () => {
    // Simulez des données de panier ou récupérez-les depuis votre contexte/état global
    const [articlesPanier, setArticlesPanier] = useState([
        { id: '1', nom: 'Produit Exemple 1', prix: 10.99, quantite: 1 },
        { id: '2', nom: 'Produit Exemple 2', prix: 15.49, quantite: 2 },
    ]);

    // Fonction pour ajuster la quantité d'un article
    const ajusterQuantite = (id, delta) => {
        setArticlesPanier(articlesPanier.map(article => {
            if (article.id === id) {
                return { ...article, quantite: Math.max(1, article.quantite + delta) };
            }
            return article;
        }));
    };

    // Calcul du total du panier
    const totalPanier = articlesPanier.reduce((total, article) => total + article.prix * article.quantite, 0).toFixed(2);

    return (
        <View style={styles.container}>
            <Text style={styles.titre}>Mon Panier</Text>
            <FlatList
                data={articlesPanier}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.articleContainer}>
                        <Text style={styles.articleNom}>{item.nom}</Text>
                        <View style={styles.quantiteContainer}>
                            <TouchableOpacity onPress={() => ajusterQuantite(item.id, -1)}>
                                <MaterialIcons name="remove" size={24} color="black" />
                            </TouchableOpacity>
                            <Text style={styles.quantiteText}>{item.quantite}</Text>
                            <TouchableOpacity onPress={() => ajusterQuantite(item.id, 1)}>
                                <MaterialIcons name="add" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.articlePrix}>${item.prix}</Text>
                    </View>
                )}
            />
            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total: ${totalPanier}</Text>
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
    },
    titre: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    articleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    articleNom: {
        fontSize: 16,
        fontWeight: '500',
    },
    quantiteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantiteText: {
        marginHorizontal: 10,
    },
    articlePrix: {
        fontSize: 16,
        fontWeight: '500',
    },
    totalContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    checkoutButton: {
        marginTop: 10,
        backgroundColor: '#781e1e',
        padding: 10,
        borderRadius: 5,
    },
    checkoutButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default PanierScreen;
