import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image,
    ActivityIndicator,
    Modal,
    ScrollView, Dimensions, SafeAreaView, Button, Pressable,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useHistoryNavigation} from "../middleware/NavigationHistoryContext";
import {useFocusEffect} from "@react-navigation/native";

export default function RechercheProduits({ navigation,route }) {
    const { searchQuery } = route.params;
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false); // Pour contrôler la visibilité de la modal
    const [selectedProduct, setSelectedProduct] = useState(null); // Pour stocker le produit sélectionné
    const { addRouteToHistory } = useHistoryNavigation();

    useFocusEffect(
        React.useCallback(() => {
            addRouteToHistory('Détails de la commande'); // Replace 'MyScreen' with the actual name of your screen
        }, [])
    );

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch("https://gourmandise.mgueye-ba.v70208.campus-centre.fr/api/products");
                const data = await response.json();
                const lower = searchQuery.toLowerCase();
                const filtered = data.filter(product =>
                    (product.designation && product.designation.toLowerCase().includes(lower)) ||
                    (product.description && product.description.toLowerCase().includes(lower))
                );
                setFilteredProducts(filtered);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [searchQuery]);

    const openModal = (product) => {
        setSelectedProduct(product);
        setModalVisible(true);
    };
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={{ flex: 1 }}>
                {isLoading ? (
                    <ActivityIndicator size="large" />
                ) : filteredProducts.length > 0 ? (
                    <FlatList
                        data={filteredProducts}
                        keyExtractor={item => item.reference.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => openModal(item)} style={styles.card}>
                                <Image source={{ uri: item.url_image }} style={styles.productImage} />
                                <View style={styles.textContainer}>
                                    <Text style={styles.productName}>{item.designation}</Text>

                                    <Text style={styles.productPrice}>{((item.prix_unitaire_HT * 0.2 + item.prix_unitaire_HT)).toFixed(2)}€</Text>
                                    <TouchableOpacity
                                        style={[styles.button, styles.buttonClose, item.stock <= 0 && styles.buttonDisabled]}
                                        onPress={() => navigation.navigate('Produits', {selectedProduct: item})}
                                        disabled={item.stock <= 0} // Désactive le bouton si le stock est inférieur ou égal à 0
                                    >
                                        <Text style={styles.textStyle}>Acheter</Text>
                                    </TouchableOpacity>
                                    {/* Ici, on vérifie le stock et on affiche le message correspondant */}
                                    {item.stock > 0 ? (
                                        <Text style={styles.stockText}>En Stock</Text>
                                    ) : (

                                        <Text style={styles.stockTextHors}>Hors Stock</Text>
                                    )}
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                ) : (
                    <Text style={styles.noResultsText}>Aucun produit trouvé</Text>
                )}

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            {selectedProduct && (
                                <>
                                    <Image source={{ uri: selectedProduct.url_image }} style={styles.modalProductImage} />
                                    <Text style={styles.modalProductName}>{selectedProduct.designation}</Text>
                                    <Text style={styles.modalProductDescription}>{selectedProduct.description}</Text>
                                    <TouchableOpacity
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => setModalVisible(false)}
                                    >
                                        <Text style={styles.textStyle}>Fermer</Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
}


const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({



    stockTextHors: {
        color: "red"
    },

    stockText:{
        color:"green"
    },

    noResultsText: {
        fontSize: 18,
        textAlign: "center",
        marginTop: 20,
    },


    closeButtonText: {
        color: 'white',       // Couleur du texte
        fontSize: 18,

    },
    quantityInput: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        padding: 5,
        marginHorizontal: 10,
        width: 50,
        height: 30,
        textAlign: 'center',
    },
    closeButton: {
        position: 'absolute',
        left: (screenWidth / 2) - 25, // Centre le bouton sur l'axe X
        bottom: 20,
        width: 48,
        height: 48,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    },
    fullScreenModal: {
        flex: 1,
    },
    fullSizeImage: {
        width: '100%',        // Prend toute la largeur de l'écran
        height: 300,          // Hauteur fixe, ajustez selon vos besoins
        resizeMode: 'cover',  // Assure que l'image couvre toute la largeur sans être déforméee
        alignSelf: 'flex-start' // Alignement en haut
    },
    modalContent: {
        padding: 20,
    },
    modalProductName: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalProductDescription: {
        fontSize: 16,
        color: 'grey',
        marginBottom: 10,
    },
    modalProductPrice: {
        fontSize: 18,
        color: 'black',
        marginBottom: 10,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    quantityText: {
        marginHorizontal: 10,
        fontSize: 18,
    },
    buttonAddToCart: {
        backgroundColor: '#582900',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    safeAreaContainer: {
        flex: 1,
        backgroundColor:'#fff',
    },
    container: {
        flex: 1,
    },
    containerNav: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingTop: 50,
        paddingBottom: 10,
        backgroundColor: "#582900",
    },
    titleNav: {
        fontSize: 22,
        fontWeight: "bold",
        flex: 1,
        textAlign: "center",
        marginLeft: -40,
        color: "#FFFFFF",
    },
    menuIcon: {
        fontSize: 28,
        color: "#FFFFFF",
    },
    card: {
        flexDirection: "row",
        padding: 16,
        marginVertical: 12,
        marginHorizontal: 20,
        backgroundColor: "#fff",
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 8,
        height: 120,
    },
    productImage: {
        width: 90,
        height: 90,
        borderRadius: 50,
        marginRight: 20,
    },
    cardContent: {
        flex: 1,
        justifyContent: "center",
        paddingLeft: 0,
    },
    productName: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 16,
        color: "grey",
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
    },
    pageNumberText: {
        fontSize: 16,
    },
    buttonText: {
        color: 'white',
    },
    button: {
        backgroundColor: "#582900",
        padding: 0,
        borderRadius: 5,
        paddingHorizontal: 20, // Espacement horizontal à l'intérieur du bouton
        paddingVertical: 0, // Espacement vertical à l'intérieur du bouton
        width: 100, // Largeur fixe
        height: 30, // Hauteur fixe
        justifyContent: 'center', // Centre le texte verticalement
        alignItems: 'center', // Centre le texte horizontalement

    },
    buttonDisabled: {
        backgroundColor: "#aaa",
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,

    },
    buttonClose: {
        backgroundColor: '#582900',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});
