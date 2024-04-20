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
import Produits from "./Produits";
import {useHistoryNavigation} from "../middleware/NavigationHistoryContext";


const Panier = () => {
    const [articlesPanier, setArticlesPanier] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] = useState(false);
    const [confirmDeleteAllModalVisible, setConfirmDeleteAllModalVisible] = useState(false);
    const [paymentSimulationModalVisible, setPaymentSimulationModalVisible] = useState(false);
    const [productToDeleteId, setProductToDeleteId] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedDeliveryDate, setSelectedDeliveryDate] = useState('');
    const [vendeurs, setVendeurs] = useState([]);
    const [selectedVendeur, setSelectedVendeur] = useState(null);
    const [orderConfirmationModalVisible, setOrderConfirmationModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [reloadTrigger, setReloadTrigger] = useState(0);
    const { addRouteToHistory } = useHistoryNavigation();

    useFocusEffect(
        React.useCallback(() => {
            addRouteToHistory('Panier'); // Replace 'MyScreen' with the actual name of your screen
        }, [])
    );


    const openPaymentSimulationModal = () => {
        setPaymentSimulationModalVisible(true);
    };

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

    const getDeliveryDates = () => {
        let dates = [];
        for (let i = 3; i <= 9; i += 3) {
            let date = new Date();
            date.setDate(date.getDate() + i);
            dates.push(date.toISOString().split('T')[0]);
        }
        return dates;
    };


    const openConfirmDeleteModal = (id) => {
        setProductToDeleteId(id);
        setConfirmDeleteModalVisible(true);
    };

    const supprimerTousLesArticles = async () => {
        // Vider le panier en sauvegardant un tableau vide dans AsyncStorage
        await AsyncStorage.setItem('cart', JSON.stringify([]));

        setArticlesPanier([]);
    };

    const openConfirmDeleteAllModal = () => {
        setConfirmDeleteAllModalVisible(true);
    };

    const handleDeleteAllConfirm = async () => {
        await supprimerTousLesArticles(); // Supposons que c'est votre fonction pour supprimer tous les articles
        setConfirmDeleteAllModalVisible(false);
        // Ajoutez ici toute logique supplémentaire nécessaire après la suppression
    };




    const supprimerArticleDuPanier = async (idArticleASupprimer) => {
        // Récupérer le panier actuel
        const cartJson = await AsyncStorage.getItem('cart');
        let cart = cartJson ? JSON.parse(cartJson) : [];

        // Filtrer le panier pour supprimer l'article avec l'id spécifié
        const nouveauPanier = cart.filter(article => article.id !== idArticleASupprimer);

        // Sauvegarder le nouveau panier dans AsyncStorage
        await AsyncStorage.setItem('cart', JSON.stringify(nouveauPanier));

        setArticlesPanier(nouveauPanier);
    };


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

    useEffect(() => {
        const fetchVendeurs = async () => {
            try {
                const response = await fetch('https://gourmandise.mgueye-ba.v70208.campus-centre.fr/api/vendeurs/');
                const data = await response.json();
                setVendeurs(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des vendeurs:', error);
            }
        };

        fetchVendeurs();
    }, []);

    const openModal = (product) => {
        setSelectedProduct(product);
        setModalVisible(true);
        console.log(product);
    };

    const onCommandePasse = () => {
        setReloadTrigger(prev => prev + 1); // Cela déclenchera le rechargement
    };

    const deliveryDates = getDeliveryDates();

    const simulerPaiement = async () => {
        // Récupérer l'email stocké
        const userEmail = await AsyncStorage.getItem('userEmail');
        const userToken = await AsyncStorage.getItem('userToken');
        const totalHT = parseFloat(totalPanier);
        const totalTVA = totalHT * 0.20;

        if (!selectedVendeur || !selectedDeliveryDate) {
            setErrorMessage('Veuillez sélectionner un vendeur et une date de livraison.');
            return; // Arrête l'exécution de la fonction
        }

        if (!userEmail || !userToken) {
            setErrorMessage("Vous devez être connecté pour passer une commande.");
            return;
        }

        setErrorMessage('');

        // Préparer le corps de la requête avec les données de la commande
        const body = {
            email: userEmail,
            codev: selectedVendeur,
            date_livraison: selectedDeliveryDate,
            date_commande: new Date().toISOString().split('T')[0],
            total_ht: totalHT,
            total_tva: totalTVA,
            etat: 1,
            com_payee: 1,
            com_prete: 0,
            lignecommande: articlesPanier.map((article, index) => ({
                numero_ligne: index + 1,
                reference: article.id,
                quantite_demandee: article.quantite,
                total_ht: parseFloat(article.prixHT) * article.quantite // Calcul du total HT pour chaque produit
            }))
        };

        // Faire la requête API pour passer la commande
        try {
            const response = await fetch("https://gourmandise.mgueye-ba.v70208.campus-centre.fr/api/passcommand", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`, // Inclure le token ici
                },
                body: JSON.stringify(body)
            });

            if (response.ok) {
                console.log("Commande passée avec succès !");
                setPaymentSimulationModalVisible(false); // Fermer la modale de simulation de paiement
                setOrderConfirmationModalVisible(true); // Ouvrir la modale de confirmation de commande
                supprimerTousLesArticles(); // Videz le panier après une soumission réussie
                setErrorMessage(''); // Réinitialise le message d'erreur
                onCommandePasse(); // Déclencher le rechargement des commandes
            } else {
                // Gestion des erreurs
                console.log(body)
                console.error("Erreur lors de la passation de la commande");
                const errorResponse = await response.json(); // Assurez-vous que le serveur renvoie une réponse JSON
                setErrorMessage(errorResponse.message || 'Une erreur est survenue, veuillez réessayer.');

            }
        } catch (error) {
            console.error("Erreur lors de la requête:", error);
            setErrorMessage('Impossible de se connecter au serveur. Veuillez vérifier votre connexion Internet et réessayer.');
        }
    };

    const resetSelections = () => {
        setSelectedVendeur(null);
        setSelectedDeliveryDate('');
        setErrorMessage('');
    };

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                resetSelections(); // Réinitialise les sélections lorsque l'écran perd le focus
            };
        }, [])
    );


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
                {errorMessage && <Text style={stylesProduits.errorMessage}>{errorMessage}</Text>}
                <Text style={styles.totalText}>Total: €{totalPanier}</Text>
                <TouchableOpacity style={styles.checkoutButton} onPress={openPaymentSimulationModal}>
                    <Text style={styles.checkoutButtonText} >Simuler paiement</Text>

                </TouchableOpacity>



            </View>
            {articlesPanier.length > 0 && (
                <TouchableOpacity style={styles.iconTrash2} onPress={openConfirmDeleteAllModal}>
                    <Entypo name="trash" size={30} color="#9E2B40" />
                </TouchableOpacity>
            )}


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
                transparent={true}
                visible={confirmDeleteAllModalVisible}
                onRequestClose={() => setConfirmDeleteAllModalVisible(false)}>
                <View style={stylesProduits.centeredView2}>
                    <View style={stylesProduits.modalView2}>

                    <Text>Êtes-vous sûr de vouloir supprimer tous les articles du panier ?</Text>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <TouchableOpacity onPress={() => setConfirmDeleteAllModalVisible(false)} style={{ marginRight: 20 }}>
                            <Text>Annuler</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleDeleteAllConfirm}>
                            <Text>Confirmer</Text>
                        </TouchableOpacity>
                    </View>
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

            <Modal
                animationType="slide"
                transparent={true}
                visible={paymentSimulationModalVisible}
                onRequestClose={() => setPaymentSimulationModalVisible(false)}
            >

                <View style={stylesProduits.centeredView}>
                    <View style={stylesProduits.modalView}>
                        <Text style={stylesProduits.modalText}>Choisissez un vendeur :</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, flexWrap: 'wrap', marginTop: 20, marginBottom: 15 }}>
                        {vendeurs.map((vendeur) => (
                            <TouchableOpacity
                                key={vendeur.codev}
                                onPress={() => setSelectedVendeur(vendeur.codev)}
                                style={[
                                    stylesProduits.button,
                                    selectedVendeur === vendeur.codev ? stylesProduits.buttonSelected : {},
                                    { margin: 2 }
                                ]}>
                                <Text style={stylesProduits.textStyle}>{vendeur.nom}</Text>
                            </TouchableOpacity>
                        ))}
                        </View>
                        <Text style={stylesProduits.modalText}>Choisissez une date de livraison :</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10, flexWrap: 'wrap', marginTop: 30, marginBottom: 70 }}>
                            {deliveryDates.map((date, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => setSelectedDeliveryDate(date)}
                                    style={[
                                        stylesProduits.button,
                                        selectedDeliveryDate === date ? stylesProduits.buttonSelected : {},
                                        { marginHorizontal: 10 },
                                        { margin: 2 }
                                    ]}>
                                    <Text style={stylesProduits.textStyle}>{date}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        {errorMessage ? (
                            <Text style={{ color: 'red', textAlign: 'center', marginTop: 20 }}>{errorMessage}</Text>
                        ) : null}
                        <TouchableOpacity
                            style={[stylesProduits.button, stylesProduits.buttonValidate]}
                            onPress={() => {
                                simulerPaiement(); // Assurez-vous que cette fonction envoie la requête API avec les données sélectionnées
                            }}
                        >
                            <Text style={stylesProduits.textStyle}>Valider la commande</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[stylesProduits.button, stylesProduits.buttonClose, { margin: 2 }
                            ]}
                            onPress={() => {
                               setPaymentSimulationModalVisible(false);
                                resetSelections();

                            }}
                        >
                            <Text style={stylesProduits.textStyle}>Fermer</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={orderConfirmationModalVisible}
                onRequestClose={() => setOrderConfirmationModalVisible(false)}
            >
                <View style={stylesProduits.centeredView}>
                    <View style={stylesProduits.modalView}>
                        <Text style={stylesProduits.modalText}>Merci pour votre commande</Text>
                        <Pressable
                            style={[stylesProduits.button, stylesProduits.buttonClose]}
                            onPress={() => setOrderConfirmationModalVisible(false)}

                        >
                            <Text style={stylesProduits.textStyle}>Fermer</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

        </View>
    );
};

export default Panier;