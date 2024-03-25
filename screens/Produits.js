import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image,
    SafeAreaView,
    Modal,
    Pressable,
    ScrollView,
    TextInput,
    Dimensions
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Produits({ navigation,route }) {
    const [data, setData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 11; // Fixe à 11 produits par page
    const [totalPages, setTotalPages] = useState(0);


    useEffect(() => {
        const fetchTotalCount = async () => {
            try {
                const response = await fetch(
                    "https://gourmandise.mgueye-ba.v70208.campus-centre.fr/api/products/count"
                );
                const totalItemsResponse = await response.json();
                const totalItems = totalItemsResponse.total;
                const totalPagesCalculated = Math.ceil(totalItems / itemsPerPage);
                setTotalPages(totalPagesCalculated);
            } catch (err) {
                console.error(err);
            }
        };
        fetchTotalCount();
    }, []);


    const fetchData = async () => {
        const cachedData = await AsyncStorage.getItem(`data_page_${currentPage}`);
        if (cachedData) {
            setData(JSON.parse(cachedData));
        } else {
            try {
                const response = await fetch(
                    `https://gourmandise.mgueye-ba.v70208.campus-centre.fr/api/products/paginated?page=${currentPage}&limit=${itemsPerPage}`,
                    {
                        method: "GET",
                        headers: {
                            accept: "application/json",
                            "Content-Type": "application/json",
                        },
                    }
                );
                const jsonData = await response.json();
                const productsWithQuantity = jsonData.map((item) => ({
                    ...item,
                    quantity: 1,
                }));
                await AsyncStorage.setItem(`data_page_${currentPage}`, JSON.stringify(productsWithQuantity));
                setData(productsWithQuantity);
            } catch (err) {
                console.error(err);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };


    const handleQuantityChange = (item, delta) => {
        setData((currentData) =>
            currentData.map((prod) => {
                if (prod.reference === item.reference) {
                    const newQuantity = Math.max(1, prod.quantity + delta);
                    return { ...prod, quantity: newQuantity };
                }
                return prod;
            })
        );
        if (selectedProduct && selectedProduct.reference === item.reference) {
            const newQuantity = Math.max(1, selectedProduct.quantity + delta);
            setSelectedProduct({ ...selectedProduct, quantity: newQuantity, inputQuantity: newQuantity.toString() });
        }
    };


    const openModal = (product) => {

        if (!product.quantity) {
            product.quantity = 1;
        }

        setSelectedProduct({ ...product, inputQuantity: product.quantity.toString() });
        setModalVisible(true);
    };


    const handleAddToCartFromModal = async (product) => {
        const cartJson = await AsyncStorage.getItem('cart');
        let cart = cartJson ? JSON.parse(cartJson) : [];

        const productIndex = cart.findIndex((item) => item.reference === product.reference );

        if (productIndex !== -1) {
            cart[productIndex].quantity += 1;
            cart[productIndex].prix = parseFloat(cart[productIndex].prix) * cart[productIndex].quantity;
        } else {
            cart.push({
                id: product.reference,
                nom: product.nom || product.designation,
                prix: parseFloat(product.prix_unitaire_HT * 1.2).toFixed(2),
                quantite: product.quantity,
                image: product.url_image
            });
            console.log(product.reference);
        }

        await AsyncStorage.setItem('cart', JSON.stringify(cart));
        setModalVisible(false);
    };





    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => openModal(item)} style={styles.card}>
            <Image source={{ uri: item.url_image }} style={styles.productImage} />
            <View style={styles.cardContent}>
                <Text style={styles.productName}>{item.designation}</Text>
                <Text style={styles.productPrice}>
                    {((item.prix_unitaire_HT * 0.2 + item.prix_unitaire_HT) * item.quantity).toFixed(2)}€
                </Text>
            </View>
        </TouchableOpacity>
    );
    useEffect(() => {
        if (route.params?.selectedProduct) {
            let productDetails = route.params.selectedProduct;


            // Assurez-vous que productDetails a une propriété `quantity`
            if (!productDetails.quantity) {
                productDetails = { ...productDetails, quantity: 1 };
            }
            setSelectedProduct(productDetails);
            setModalVisible(true);
        }
    }, [route.params?.selectedProduct]);



    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.container}>
                <View>

                </View>

                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.reference.toString()}
                />

                <View style={styles.paginationContainer}>
                    <TouchableOpacity
                        onPress={prevPage}
                        disabled={currentPage === 1}
                        style={[styles.button, currentPage === 1 && styles.buttonDisabled]}
                    >
                        <Text style={styles.buttonText}>{" < "}</Text>
                    </TouchableOpacity>
                    <Text style={styles.pageNumberText}>Page {currentPage} sur {totalPages}</Text>
                    <TouchableOpacity
                        onPress={nextPage}
                        disabled={currentPage === totalPages}
                        style={[styles.button, currentPage === totalPages && styles.buttonDisabled]}
                    >
                        <Text style={styles.buttonText}>{" > "}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}>
                <ScrollView style={styles.fullScreenModal}>
                    {selectedProduct && (
                        <>
                            <Image source={{ uri: selectedProduct.url_image }} style={styles.fullSizeImage} />
                            <View style={styles.modalContent}>
                                <Text style={styles.modalProductName}>{selectedProduct.designation}</Text>
                                <Text style={styles.modalProductDescription}>{selectedProduct.description}</Text>
                                <Text style={styles.modalProductPrice}>
                                    Prix: {((selectedProduct.prix_unitaire_HT * 0.2 + selectedProduct.prix_unitaire_HT) * selectedProduct.quantity).toFixed(2)}€
                                </Text>
                                <View style={styles.quantityContainer}>
                                    <TouchableOpacity onPress={() => handleQuantityChange(selectedProduct, -1)}>
                                        <Ionicons name="remove-circle-outline" size={24} color="black" />
                                    </TouchableOpacity>
                                    <TextInput
                                        style={styles.quantityInput}
                                        keyboardType='numeric'
                                        placeholder="1"
                                        value={selectedProduct.inputQuantity}
                                        onChangeText={(text) => setSelectedProduct({ ...selectedProduct, inputQuantity: text })}
                                        onEndEditing={() => {
                                            const newQuantity = Math.max(1, parseInt(selectedProduct.inputQuantity) || 1);
                                            setSelectedProduct({ ...selectedProduct, quantity: newQuantity, inputQuantity: newQuantity.toString() });
                                        }}
                                    />
                                    <TouchableOpacity onPress={() => handleQuantityChange(selectedProduct, 1)}>
                                        <Ionicons name="add-circle-outline" size={24} color="black" />
                                    </TouchableOpacity>
                                </View>
                                <Pressable
                                    style={[styles.button, styles.buttonAddToCart]}
                                    onPress={() => handleAddToCartFromModal(selectedProduct)}>
                                    <Text style={styles.textStyle}>Ajouter au Panier</Text>
                                </Pressable>

                            </View>
                        </>
                    )}
                </ScrollView>
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}>
                    <Text style={styles.closeButtonText}>X</Text>
                </TouchableOpacity>
            </Modal>
        </SafeAreaView>

    );

}


const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({


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
        backgroundColor:'white',
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
        shadowRadius: 8,
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
        padding: 10,
        borderRadius: 5,
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
        backgroundColor: '#2196F3',
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